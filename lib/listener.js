const amqp_subs = require("./subscriber")

const consume_message = async () => {
    return await amqp_subs.consume()
}

consume_message()
