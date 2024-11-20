const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
  name: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  dueDate: { type: Date },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Item', itemSchema);
