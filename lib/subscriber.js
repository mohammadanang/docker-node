/* eslint no-eval: 0 */
const amqp = require('amqplib/callback_api');

const amqp_uri = process.env.AMQP_URI;

const runTask = async (task_name) => {
  eval(task_name);

  return true;
};

const consume = async () => {
  return new Promise((rslv, rjct) => {
    amqp.connect(amqp_uri, (err, conn) => {
      if (err) return rjct(err);

      const result = new Promise((resolve, reject) => {
        conn.createChannel((error, ch) => {
          if (error) return reject(error);

          const queue = 'dckrnd';
          ch.assertQueue(queue, { durable: false });

          console.log(`Waiting for message in %s. Queue: ${queue}`);

          ch.consume(
            queue,
            async (msg) => {
              const receive = JSON.parse(msg.content);
              console.log(`Message ${JSON.stringify(receive)}`);

              await runTask(receive.method, receive.params);

              return resolve(receive);
            },
            {
              noAck: true,
            }
          );

          return true;
        });
      });

      return rslv(result);
    });
  });
};

module.exports = {
  consume,
};
