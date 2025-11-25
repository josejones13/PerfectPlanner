// routes/auth.js
const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

// GET Register page
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register" , error: null});
});

// POST Register form
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.render("auth/register", {
      title: "Register",
      error: "All fields are required."
    });
  }

  if (password !== confirmPassword) {
    return res.render("auth/register", {
      title: "Register",
      error: "Passwords do not match."
    });
  }

  try {
    const existing = await User.findOne({ username });

    if (existing) {
      return res.render("auth/register", {
        title: "Register",
        error: "Username is already taken."
      });
    }

    const user = new User({ username, password });
    await user.save();

    // After registration, go to login
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("auth/register", {
      title: "Register",
      error: "Something went wrong. Please try again."
    });
  }
});

// GET Login page
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    error: req.flash("error")
  });
});

// POST Login form
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// POST Logout
router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  });
});

module.exports = router;
