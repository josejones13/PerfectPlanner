module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },

  forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/dashboard"); // send authenticated users away from login/register
  }
};
