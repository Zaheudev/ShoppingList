// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../middleware/authenticate');

// PATCH /api/users/ - Accept an invite from notification button
router.patch('/', authenticate, usersController.inviteUser);

module.exports = router;