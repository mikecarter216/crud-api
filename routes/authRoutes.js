// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  authController.googleCallback
);

// Success / Failure
router.get('/success', authController.loginSuccess);
router.get('/failure', authController.loginFailure);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
