const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../../models/user.model');
const API = require('../../core/action.core');

class Create extends API {
  constructor() {
    super(User);
  }

  async exec(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        code: 422,
        status: 'error',
        message: errors.array(),
      });
    }

    try {
      const { name, email, phone, password } = req.body;
      const request_data = {
        name,
        email,
        phone,
        password: bcrypt.hashSync(password, 8), // params: password, salt
      };

      const data = await this.create(request_data);

      return res.send({
        code: 201,
        status: 'success',
        data,
      });
    } catch (err) {
      return res.send({
        code: 400,
        status: 'error',
        message: err.message,
      });
    }
  }
}

module.exports = Create;
