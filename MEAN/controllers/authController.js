const passport = require("passport");
const User = require("../models/user");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.redirect("/login");
};

exports.login = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
});

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
};
