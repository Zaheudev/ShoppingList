// routes/users.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');

// Get the authenticated user's data
router.get('/user', authenticate, async (req, res) => {
  try {
    // Fetch the user data from the database using the user ID from the token using mongoose function
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;