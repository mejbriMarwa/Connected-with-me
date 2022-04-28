const express = require("express");
const router = express.Router();
const { registerUser, loginuser, loadUserInfo } = require("../controllers/userController");

router.post("/registerUser", registerUser);
router.get("/loginUser", loginuser);
router.get("/userInfo", loadUserInfo);

module.exports = router;
