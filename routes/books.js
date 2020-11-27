/* eslint no-underscore-dangle: 0 */
const express = require('express');

const router = express.Router();
const e = require('events');
const { LogListener } = require('api-inti');
const CreateBook = require('../actions/books/create.action');
const Book = require('../models/book');
const Shop = require('../models/shop.model');

const ee = new e.EventEmitter();
const BookController = require('../controllers/books.controller');

router.post('/', async (req, res) => {
  try {
    LogListener(ee);
    // let on = ShopListener(ee)
    // console.log(`on ${on}`)

    const { title, description, price, author, shop_id } = req.body;
    const inputs = {
      title,
      description,
    };

    if (price) {
      inputs.price = parseInt(price, 10);
    }

    if (author) {
      inputs.author = author;
    }

    if (shop_id) {
      inputs.shop_id = shop_id;
    }

    const data = await new CreateBook(inputs).exec();

    const log = {
      model: 'Books',
      model_id: data._id,
      value: data,
      action: 'create book',
      type: 'success',
      notes: 'Log create book success',
    };
    const logs = ee.emit('log.custom', log);
    // let logs = ee.emit("shop.test", log)
    console.log(`emit ${logs}`);

    return res.send({
      status: 'success',
      message: 'Create book successfully',
      data,
    });
  } catch (err) {
    return res.send({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    let limit = 10;
    let page = 1;
    const sort = { created_at: -1 };
    const query = {};

    if (req.query.title) {
      query.title = req.query.title;
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit, 10);
    }

    if (req.query.page) {
      page = parseInt(req.query.page, 10);
    }

    const populate = [
      {
        path: 'shop_id',
        model: Shop,
      },
    ];

    let data = await Book.paginate(query, {
      page,
      limit,
      sort,
      lean: true,
      populate,
    });

    const meta = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
    data = data.docs;

    return res.send({
      status: 'success',
      message: 'book list',
      data,
      meta,
    });
  } catch (err) {
    return res.send({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/list', async (req, res) => {
  const result = await BookController.index(req, res);
  return result;
});
router.get('/paginate', async (req, res) => {
  const result = await BookController.paginate(req, res);
  return result;
});

module.exports = router;
