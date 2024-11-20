const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  createdLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' }],
  invitedLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
