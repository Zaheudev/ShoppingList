const ShoppingList = require('../models/ShoppingList');

exports.addItem = async (req, res) => {
  const { listId } = req.params;
  const { name, dueDate } = req.body;

  try {
    const list = await ShoppingList.findById(listId);
    if (!list) return res.status(404).json({ message: 'Shopping list not found' });

    const newItem = {
      _id: new mongoose.Types.ObjectId(),
      name,
      resolved: false,
      dueDate,
    };

    list.items.push(newItem);
    await list.save();

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  const { listId, itemId } = req.params;

  try {
    const list = await ShoppingList.findById(listId);
    if (!list) return res.status(404).json({ message: 'Shopping list not found' });

    list.items = list.items.filter((item) => item._id.toString() !== itemId);
    await list.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
