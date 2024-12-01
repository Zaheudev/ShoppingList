const express = require('express');
const { addItem, deleteItem } = require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');
const router = express.Router();

router.post('/:id', authenticate, checkOwnership, addItem);
router.delete('/:id', authenticate, checkOwnership, deleteItem);

module.exports = router;
