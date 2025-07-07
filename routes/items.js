const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('✅ /api/items/test is working!');
});

module.exports = router;