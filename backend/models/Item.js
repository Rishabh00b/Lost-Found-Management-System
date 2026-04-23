const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: String,
  type: String,
  location: String,
  contactInfo: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);