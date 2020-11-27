/**
 * Book Schema
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const bookSchema = new Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    default: 0,
  },
  author: String,
  shop_id: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
