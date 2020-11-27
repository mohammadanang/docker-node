/* eslint no-underscore-dangle: 0 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

class Register {
  constructor(req) {
    this.name = req.body.name;
    this.email = req.body.email;
    this.phone = req.body.phone;
    this.password = req.body.password;
  }

  async exec() {
    const password = bcrypt.hashSync(this.password, 8); // params: password, salt
    const insert_data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password,
    };

    const query = new User(insert_data);
    await query.save();

    const payload = {
      user_id: query._id,
      user_name: query.name,
      user_email: query.email,
      user_phone: query.phone,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    return {
      user: payload,
      token,
      expires_in: '24 hours',
    };
  }
}

module.exports = Register;
