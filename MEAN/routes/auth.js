const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/authMiddleware");

// Homepage (index.ejs)
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Login page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { title: "Login" });
});

// Register page
router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register", { title: "Register" });
});

// Registration + Login logic
router.post("/register", register);
router.post("/login", login);

// Logout
router.get("/logout", ensureAuthenticated, logout);

module.exports = router;

