const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');

// GET /api/shoppingLists - Retrieve all shopping lists the user has access to
router.get('/', authenticate, shoppingListController.getShoppingLists);

// GET /api/shoppingLists/:id - Retrieve shopping list with /:id if user has access to
router.get('/:id', authenticate, shoppingListController.getShoppingList);

// POST /api/shoppingLists - Create a new shopping list
router.post('/', authenticate, shoppingListController.createShoppingList);

// DELETE /api/shoppingLists/:id - Delete a shopping list
router.delete('/:id', authenticate, checkOwnership, shoppingListController.deleteShoppingList);

// PATCH /api/shoppingLists/:id - Update a shopping list (e.g., archived, status)
router.patch('/:id', authenticate, checkOwnership, shoppingListController.updateShoppingList);

module.exports = router;