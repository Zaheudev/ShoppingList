const ShoppingList = require('../models/ShoppingList');

exports.addItem = async (req, res) => {
  const listId  = req.params.id;
  const { name, date } = req.body;
  try {
    const list = await ShoppingList.findById(listId);
    if (!list) return res.status(404).json({ message: 'Shopping list not found' });

    const newItem = {
      listId,
      name,
      resolved: false,
      date,
    };
    console.log(name, date);

    list.items.push(newItem);
    await list.save();

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const { id, itemId } = req.params;
  try {
    const list = await ShoppingList.findById(id);
    if (!list) return res.status(404).json({ message: 'Shopping list not found' });

    list.items = list.items.filter((item) => item._id.toString() !== itemId);
    await list.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resolveItem = async (req, res) => {
  const { id, itemId} = req.params;
  try {
    const list = await ShoppingList.findById(id);
    if (!list) return res.status(404).json({ message: 'Shopping list not found' });
    const item = list.items.find((item) => item._id.toString() == itemId);
    list.items.find((item) => item._id.toString() == itemId).resolved = !item.resolved;
    await list.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
}
