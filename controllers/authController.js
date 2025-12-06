// controllers/authController.js
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/* ===========================
      LOCAL LOGIN
===========================*/
exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
});

/* ===========================
      LOGOUT
===========================*/
exports.logout = (req, res) => {
  req.logout(() => res.redirect("/auth/login"));
};

/* ===========================
      🔥 FORGOT PASSWORD
===========================*/
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;  // <--- NOW USING EMAIL

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("auth/forgot", {
      title: "Forgot Password",
      error: "No account exists with that email",
      success: null
    });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 3600000; // 1hr
  await user.save();

  // 🔥 We send to real email now
  const resetURL = `${process.env.BASE_URL}/auth/reset/${resetToken}`;

  console.log("\n===== PASSWORD RESET LINK =====");
  console.log(resetURL);
  console.log("================================\n");

  await sendEmail(
    user.email,
    "Password Reset Request",
    `Click the link to reset your password:\n${resetURL}`
  );

  return res.render("auth/forgot", {
    title: "Forgot Password",
    success: "Reset link was emailed to you!",
    error: null
  });
};

/* ===========================
   RESET PASSWORD FORM (GET)
===========================*/
exports.resetPasswordForm = (req, res) => {
  res.render("auth/reset", {
    title: "Reset Password",
    token: req.params.token,
    error: null
  });
};

/* ===========================
   RESET PASSWORD SUBMIT (POST)
===========================*/
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, password2 } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.render("auth/reset", {
      title: "Reset Password",
      token,
      error: "Reset link is invalid or expired"
    });
  }

  if (password !== password2) {
    return res.render("auth/reset", {
      title: "Reset Password",
      token,
      error: "Passwords do not match"
    });
  }

  // 🟢 This triggers pre-save hashing automatically
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  console.log("\n===== PASSWORD UPDATED SUCCESSFULLY =====");
  console.log("User:", user.username);
  console.log("New password hash:", user.password);
  console.log("=========================================\n");

  return res.redirect("/auth/login");
};




