const { isInteger } = require('lodash');
const Book = require('../models/book');
const User = require('../models/user.model');

const create = (req) => {
  const { title, description, price, author } = req.body;

  if (isInteger(price) === false) {
    return 'Wrong type of `price`';
  }

  const insert_data = {
    title,
    description,
    price: parseInt(price, 10),
    author,
  };

  const data = new Book(insert_data);
  data.save();

  return data;
};

const getAll = async () => {
  const query = await Book.find({})
    .populate([
      {
        path: 'author',
        model: User,
      },
    ])
    .exec();

  return query;
};

module.exports = {
  create,
  getAll,
};
