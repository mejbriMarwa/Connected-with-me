const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    room: {
      type: String,
    },
    message: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
