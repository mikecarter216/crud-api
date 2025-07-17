const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in with Google.' });
}

router.get('/protected', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: '🎉 You are authenticated!',
    user: req.user
  });
});

module.exports = router;
