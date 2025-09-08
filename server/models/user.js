const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: function checkforpassword() {
        return this.authProvider === "local";
      },
    },
    email: {
      type: String,
      unique: true,
    },
    profilepic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9094/9094119.png",
    },
    displayName: {
      type: String,
      required: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook", "linkedin", "twitter"],
      default: "local",
    },
    phone: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    resetotp: {
      code: String,
      expiresAt: Date,
    },
    bio: String,
    social_links: {
      insta: String,
      youtube: String,
      twitter: String,
      github: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
