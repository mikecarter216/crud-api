function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: '❌ Not authorized. Please log in.' });
}

module.exports = ensureAuthenticated;