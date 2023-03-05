const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  location: String,
  amount: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
