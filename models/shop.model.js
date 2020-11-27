const mongoose = require('mongoose');

const { Schema } = mongoose;

const shopSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  book_qty: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
