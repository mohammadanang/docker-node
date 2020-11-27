const amqp = require('amqplib/callback_api');

const amqp_uri = process.env.AMQP_URI;

const produce = async (message) => {
  return new Promise((rslv, rjct) => {
    amqp.connect(amqp_uri, (err, conn) => {
      if (err) return rjct(err);

      const proceed = new Promise((resolve, reject) => {
        conn.createChannel((error, ch) => {
          if (error) return reject(error);

          const queue = 'dckrnd';

          ch.assertQueue(queue, { durable: false });
          ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

          return resolve(ch);
        });

        setTimeout(() => {
          conn.close();
        }, 500);
      });

      return rslv(proceed);
    });
  });
};

const createTask = async (method, params) => {
  const message = {
    task_name: 'dckrnd',
    params,
    method,
  };

  await produce(message);

  return true;
};

module.exports = {
  createTask,
};
