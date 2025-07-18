function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // ✅ Allow access
  } else {
    res.status(401).json({ message: '❌ Not authorized. Please log in.' });
  }
}

module.exports = isAuthenticated;