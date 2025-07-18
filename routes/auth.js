const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google authentication
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  successRedirect: '/auth/success'
}));

// Show login success
router.get('/success', (req, res) => {
  if (req.user) {
    res.json({ message: '🎉 You are authenticated!', user: req.user });
  } else {
    res.status(401).json({ message: '❌ Not authenticated' });
  }
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: '👋 You have logged out successfully.' });
    });
  });
});

// Failure route
router.get('/failure', (req, res) => {
  res.status(401).json({ message: '❌ Login failed.' });
});

module.exports = router;