const ResetPassword = require('../../models/reset_password.model');
const User = require('../../models/user.model');
const { randomKey } = require('../../lib/helper');
const SendMail = require('../emails/send-mailtrap.action');

class ForgotPassword {
  constructor(email) {
    this.email = email;
  }

  async exec() {
    const user = await User.findOne({
      email: this.email,
    }).exec();
    if (user === null) {
      throw new Error('User not found');
    }

    const token = randomKey(54, 'aA#');
    const password = new ResetPassword({
      email: this.email,
      token,
    });
    await password.save();

    const request_data = {
      to: this.email,
      subject: 'Forgot Password',
      text: `Your token for reset password is: ${token}`,
      html: '',
    };

    await new SendMail(request_data).exec();

    return password;
  }
}

module.exports = ForgotPassword;
