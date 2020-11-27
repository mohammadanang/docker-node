const express = require('express');

const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');
const SendMail = require('../actions/emails/send-mailtrap.action');
const publisher = require('../lib/publisher');

router.get('/', (req, res) => {
  const db_status = mongoose.connection.readyState;
  const db_status_name = [
    'disconnected',
    'connected',
    'connecting',
    'disconnecting',
  ];

  return res.send({
    app_name: 'docker node',
    version: '1.0.0',
    server_time: moment().format(),
    database_status: db_status_name[db_status],
  });
});

router.post('/coba', async (req, res) => {
  try {
    const { shop_id, name } = req.body;
    const data = await publisher.createTask('update_shop(params)', {
      shop_id,
      name,
    });

    return res.send({
      status: 'success',
      data,
      message: 'success',
    });
  } catch (err) {
    return res.send({
      status: 'error',
      message: err.message,
    });
  }
});

router.post('/email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    await new SendMail({
      to: [to],
      subject,
      text,
      html: '',
    }).exec();

    return res.status(200).json({
      status: 'success',
      message: 'Send email successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

module.exports = router;
