// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // Not logged in → go to login page
  res.redirect("/login");
}

module.exports = { ensureAuthenticated };

