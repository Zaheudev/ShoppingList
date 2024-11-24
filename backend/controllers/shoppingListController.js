const ShoppingList = require('../models/ShoppingList');

// Get all shopping lists
exports.getShoppingLists = async (req, res) => {
  try {
    console.log(req.user);
    const { archived } = req.query;
    const filter = {
      $or: [{ ownerId: req.user.id }, { members: req.user.id }],
    };
    if (archived !== undefined) filter.archived = archived === 'true';

    const lists = await ShoppingList.find(filter);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new shopping list
exports.createShoppingList = async (req, res) => {
  try {
    const { title, members, items } = req.body;

    const newList = new ShoppingList({
      title,
      ownerId: req.user.id,
      members,
      items,
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a shopping list
exports.deleteShoppingList = async (req, res) => {
  try {
    await ShoppingList.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a shopping list
exports.updateShoppingList = async (req, res) => {
  try {
    const { archived, status } = req.body;
    const list = await ShoppingList.findById(req.params.id);

    if (!list) return res.status(404).json({ error: 'Shopping list not found' });

    if (archived !== undefined) list.archived = archived;
    if (status !== undefined) list.status = status;

    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
