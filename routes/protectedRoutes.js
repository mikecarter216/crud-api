const express = require('express');
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: '❌ Not authorized. Please log in.' });
}

router.get('/protected', ensureAuth, (req, res) => {
  res.json({ message: '🔐 Protected data access granted!', user: req.user });
});

module.exports = router;