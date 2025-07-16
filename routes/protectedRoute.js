const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated and can access this protected route.' });
});

module.exports = router;
