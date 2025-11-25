const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, password, confirm } = req.body;

    if (password !== confirm) {
      return res.render("register", { title: "Register", message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.render("register", { title: "Register", message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });

    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.render("register", { title: "Register", message: "Registration failed" });
  }
};

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
});

exports.logout = (req, res) => {
  req.logout(() => res.redirect("/login"));
};

