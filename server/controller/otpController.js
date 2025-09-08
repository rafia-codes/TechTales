const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateotp } = require("../utils/generate");
const transporter = require("../config/nodemailer");

module.exports.requestReset = async (req, res) => {
  try {
    const userinfo = req.body.emailOrUsername;
    const user = await User.findOne({
      $or: [{ email: userinfo }, { username: userinfo }],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    otp = generateotp();
    const hashedotp = await bcrypt.hash(otp, 10);
    user.resetotp.code = hashedotp;
    user.resetotp.expiresAt = Date.now() + 10 * 60 * 1000;

    transporter.sendMail({
      from: `no-reply-appsupport@gmail.com`,
      to: user.email,
      subject: "Password Reset",
      text: `Your OTP for password-reset is ${otp}.It will expire in 10 minutes.Do not share this otp with anyone.`,
      html: `Your OTP for password-reset is <b>${otp}</b>.It will expire in 10 minutes.<b>Do not share</b> this otp with anyone.`,
    });

    await user.save();
    console.log("Plain OTP:", otp);
    console.log("Hashed OTP:", hashedotp);

    return res
      .status(200)
      .json({ message: "OTP generated and (pretend) sent." });
  } catch (error) {
    console.error("❌ OTP error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No such user found." });
    if (!otp) return res.status(400).json({ message: "Please enter otp" });

    console.log("Received OTP:", otp);
    console.log("Stored hash:", user.resetotp.code);

    const isMatch = await bcrypt.compare(otp, user.resetotp.code);
    if (user.resetotp.expiresAt < Date.now())
      return res.status(400).json({ message: "Otp expired." });
    if (!isMatch) return res.status(400).json({ message: "Invalid otp" });

    return res.status(200).json({ success: "true", message: "Done" });
  } catch (err) {
    console.log(`${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    console.log(req.body);
    let { email, newPass:newpassword, confPass:confirmpassword } = req.body;
    newpassword = newpassword.trim();
    confirmpassword = confirmpassword.trim();
    if (!newpassword || !confirmpassword)
      return res.status(400).json({ message: "Enter password" });
    if (newpassword !== confirmpassword)
      return res.status(400).json({ message: "Password did not match" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No such user found" });

    if (!user.resetotp || user.resetotp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Otp expired" });
    }

    const hashed = await bcrypt.hash(newpassword, 10);
    user.password = hashed;

    user.resetotp.code = undefined;
    user.resetotp.expiresAt = undefined;

    await user.save();
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
