const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList', required: true },
  action: { type: String, required: true },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
