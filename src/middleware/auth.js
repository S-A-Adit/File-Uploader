// src/middleware/auth.js
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/dashboard"); // if already logged in → send them to dashboard
}

module.exports = { ensureAuth, ensureGuest };
