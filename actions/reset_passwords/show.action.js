const ResetPassword = require('../../models/reset_password.model');

class ShowPassword {
  constructor(params) {
    this.params = params;
  }

  async exec() {
    const data = await ResetPassword.findOne(this.params).exec();
    if (data === null) {
      throw new Error('Data not found');
    }

    return data;
  }
}

module.exports = ShowPassword;
