/* eslint no-underscore-dangle: 0 */
const bcrypt = require('bcryptjs');
const ResetPassword = require('../../models/reset_password.model');
const ShowPassword = require('./show.action');
const User = require('../../models/user.model');

class Reset {
  constructor(password, token) {
    this.password = password;
    this.token = token;
  }

  async exec() {
    const data = await new ShowPassword({
      token: this.token,
    }).exec();

    const password = bcrypt.hashSync(this.password, 8);
    const user = await User.findOne({
      email: data.email,
    }).exec();

    if (user === null) {
      throw new Error('User not found');
    }

    const updateUser = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        password,
      }
    ).exec();

    await ResetPassword.findOneAndDelete({
      token: this.token,
    }).exec();

    return updateUser;
  }
}

module.exports = Reset;
