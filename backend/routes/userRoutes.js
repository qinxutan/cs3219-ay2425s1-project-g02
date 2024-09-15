const express = require('express');
const {
  loginUser,
  logoutUser,
  checkSession,
  deleteAccount,
} = require('../controllers/userController');

const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Logout Route
router.post('/logout', logoutUser);

// Check Session Route
router.get('/check_session', checkSession);

// Delete Account Route
router.delete('/delete_account', deleteAccount);

module.exports = router;
