const express = require('express');
const { getNotifications, markAsRead, createNotifcation, deleteNotification } = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');
const router = express.Router();

router.get('/', authenticate ,getNotifications);
router.post('/:id', authenticate, checkOwnership, createNotifcation);
router.patch('/:notificationId', authenticate, markAsRead);
router.delete('/:notificationId', authenticate, deleteNotification);

module.exports = router;
