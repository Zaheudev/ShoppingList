const ShoppingList = require('../models/ShoppingList');

const checkOwnership = async (req, res, next) => {
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    if (list.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkOwnership;
