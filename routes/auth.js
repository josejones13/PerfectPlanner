// routes/auth.js
const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const { forgotPassword, resetPasswordForm, resetPassword } = require("../controllers/authController");

const router = express.Router();

/* LOGIN */
router.get("/login", (req, res) => {
  res.render("auth/login", { 
    title: "Login", 
    error: req.flash("error"), 
    success: req.flash("success") || null 
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

/* REGISTER */
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register", error: null });
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.render("auth/register", { title: "Register", error: "Passwords do not match." });

  const existing = await User.findOne({ username });
  if (existing)
    return res.render("auth/register", { title: "Register", error: "Username already taken." });

  await new User({ username, email, password }).save();
  req.flash("success", "Account created! Please login.");
  res.redirect("/auth/login");
});

/* LOGOUT */
router.post("/logout", (req, res, next) => {
  req.logout(err => { if (err) return next(err); res.redirect("/auth/login") });
});

// Add this new route to support clicking logout links
router.get("/logout", (req, res, next) => {
  req.logout(err => { 
    if (err) return next(err);
    res.redirect("/auth/login");
  });
});


/* OAUTH */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req,res)=>res.redirect("/")
);

router.get("/github", passport.authenticate("github", { scope:["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect:"/auth/login" }),
  (req,res)=>res.redirect("/")
);

router.get("/discord", passport.authenticate("discord"));
router.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/auth/login" }),
  (req,res)=>res.redirect("/")
);

// FORGOT PASSWORD PAGE
router.get("/forgot", (req,res)=> {
  res.render("auth/forgot", { 
    title: "Forgot Password",
    error: null,
    success: null
  });
});

// HANDLE SUBMIT FORGOT FORM
router.post("/forgot", (req, res, next) => {
  console.log("🔐 Password reset request received:", req.body);
  next(); 
}, forgotPassword);



router.get("/reset/:token", resetPasswordForm);
router.post("/reset/:token", resetPassword);

/* FINAL EXPORT */
module.exports = router;


