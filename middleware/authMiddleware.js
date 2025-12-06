// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Not logged in → go to login page
  res.redirect("/auth/login");
}

module.exports = { ensureAuthenticated };

