const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// create user
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, room, message, profilePicture } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "you have already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await User.create({
      name,
      email,
      room,
      message,
      profilePicture,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `something went wrong` });
  }
};
// get user
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // test for validate email
    const existUser = await User.findOne({ email });
    if (!existUser)
      return res.status(400).json({ msg: "you have  register first." });
    // test for validate password
    const validatePassword = await bcrypt.compare(password, existUser.password);
    if (!validatePassword)
      return res.status(400).json({ msg: " wrong password." });
    const token = await jwt.sign(
      { sub: existUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    res.json({ token, role: existUser.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};
// load user info
const loadUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findOne(req.userId).select("-password");
    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
};
module.exports = { registerUser, loginuser, loadUserInfo };
