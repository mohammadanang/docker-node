const amqp_subs = require('./subscriber');

const consume_message = async () => {
  const result = await amqp_subs.consume();
  return result;
};

consume_message();
