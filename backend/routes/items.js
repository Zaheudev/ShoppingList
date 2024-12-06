const express = require('express');
const { addItem, deleteItem, resolveItem } = require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');
const router = express.Router();

router.post('/:id', authenticate, checkOwnership, addItem);
router.delete('/:id/:itemId', authenticate, checkOwnership, deleteItem);
router.patch('/:id/:itemId', authenticate, checkOwnership, resolveItem);

module.exports = router;
