const express = require('express');
const { addItem, deleteItem } = require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/:listId', authenticate, addItem);
router.delete('/:listId/:itemId', authenticate, deleteItem);

module.exports = router;
