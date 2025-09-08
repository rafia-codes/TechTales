const { UserValidation } = require("../utils/validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { generateTokens, setAuthCookies } = require("../utils/tokenmanager");
const { generateusername } = require("../utils/generate");

module.exports.registerUser = async (req, res) => {
  const { displayName, email, password } = req.body;
  const { error } = UserValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const base = displayName.toLowerCase().trim().split(" ").join("_");
  const username = await generateusername(base);
  const findIfUserAlready = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (findIfUserAlready) {
    return res.status(409).json("User already exists");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    displayName,
    username,
    email,
    password: hashed,
  });
  const { accesstoken, refreshtoken } = generateTokens(user, false);
  setAuthCookies(res, accesstoken, refreshtoken);
  return res.status(200).json({ message:"Signed Up" });
};

module.exports.loginUser = async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password)
    return res.status(400).json({ message: "Enter the details" });
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  if (!user) {
    return res.status(400).json("User doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json("Invalid credentials");
  }
  const { accesstoken, refreshtoken } = generateTokens(
    user,
    req.body.rememberMe
  );
  setAuthCookies(res, accesstoken, refreshtoken, req.body.rememberMe);
  return res.status(200).json({
    message: "✅ Login successful",
    user: {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      profilepic: user.profilepic,
      email: user.email,
    },
  });
};

module.exports.refreshtoken = async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  if (!refreshtoken)
    return res.status(401).json({ message: "Refresh token missing" });
  const payload = jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
  const user = await User.findById(payload.id);
  if (!user) return res.status(401).json({ message: "Invalid refresh token" });
  const { accesstoken,refreshtoken:newRefreshToken } = generateTokens(user, true);
  setAuthCookies(res, accesstoken,newRefreshToken);
  return res.status(200).json({ message: "Access token refreshed" });
};

module.exports.logout = async (req, res) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports.userInfo = async (req, res) => {
  res.status(200).json({ user: req.user });
};
