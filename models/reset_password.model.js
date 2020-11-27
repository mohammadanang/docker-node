const mongoose = require('mongoose');

const { Schema } = mongoose;

const resetPasswordSchema = new Schema({
  email: String,
  token: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;
