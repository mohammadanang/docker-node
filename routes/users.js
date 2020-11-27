const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const { response } = require('api-inti');
const { getDetail, update, destroy } = require('../actions/users');
const UserList = require('../actions/users/list.action');
const UserCreate = require('../actions/users/create.action');
const AllUser = require('../actions/users/all.action');
const UserController = require('../controllers/users.controller');

router.post(
  '/',
  [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty().isLength({ min: 8 }),
  ],
  async (req, res, next) => {
    const result = await new UserCreate().exec(req, res, next);
    return result;
  }
);

router.get('/', async (req, res) => {
  try {
    const data = await new AllUser().exec();

    return res.send(response.success(null, 'Get all user data', data));
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/list', async (req, res, next) => {
  const result = await new UserList().exec(req, res, next);
  return result;
});

router.get('/list-v2', async (req, res) => {
  const result = await UserController.index(req, res);
  return result;
});

router.get('/my-profile', async (req, res) => {
  try {
    const user_token = req.header('Authorization');
    const user_data = await jwt.verify(user_token, process.env.JWT_SECRET);
    console.log(`User data from token ${JSON.stringify(user_data)}`);

    const data = await getDetail(user_data.user_id);

    return res.status(200).json({
      status: 'success',
      data,
      message: 'User login data',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetail(id);

    return res.status(200).json({
      status: 'success',
      data,
      message: 'Get user detail successfully!',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updated_data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    fresh: req.body.fresh,
  };

  try {
    const data = await update(id, updated_data);

    return res.status(200).json({
      status: 'success',
      data,
      message: 'User data updated successfully!',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await destroy(id);

    return res.status(200).json({
      status: 'success',
      data,
      message: 'User data deleted successfully!',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

module.exports = router;
