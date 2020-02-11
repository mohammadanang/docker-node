const amqp = require("amqplib/callback_api")
const amqp_uri = process.env.AMQP_URI

const createTask = async (method, params) => {
    let message = {
        task_name: 'dckrnd',
        params,
        method
    }

    await produce(message)

    return true
}

const produce = async (message) => {
    return new Promise((resolve, reject) => {
        amqp.connect(amqp_uri, (err, conn) => {
            if (err) return reject(err)

            let proceed = new Promise((resolve, reject) => {
                conn.createChannel((err, ch) => {
                    if (err) return reject(err)

                    let queue = 'dckrnd'

                    ch.assertQueue(queue, { durable: false })
                    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

                    console.log(`${queue} sent to MQ`)

                    return resolve(ch)
                })

                setTimeout(() => {
                    conn.close()
                }, 500)
            })

            return resolve(proceed)
        })
    })
}

module.exports = {
    createTask
}
