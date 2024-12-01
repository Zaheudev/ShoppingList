const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    items: [
      {
        name: { type: String, required: true },
        resolved: { type: Boolean, default: false },
        dueDate: { type: Date },
      },
    ],
    tags: [
      {
        type: String
      }
    ],
    archived: { type: Boolean, default: false },
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
