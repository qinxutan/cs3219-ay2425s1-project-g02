const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); // Import the authentication middleware

const router = express.Router();

// Check Session Route (authentication required)
router.get('/check_session', authenticateToken, (req, res) => {
  // Respond with user data if the session is valid
  res.status(200).json({ message: 'Session is valid', user: req.user });
});

module.exports = router;
