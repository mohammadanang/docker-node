const amqp = require("amqplib/callback_api")
const amqp_uri = process.env.AMQP_URI
const ShopModel = require("../models/shop.model")

/**
 * 
 * @param { shop_id, name } params 
 */
const update_shop = async (params) => {
    try {
        ShopModel.findOneAndUpdate({
            _id: params.shop_id
        }, {
            name: params.name
        }).exec()
    } catch(err) {
        console.log(`Error ${err.message}`)
        throw err
    }
}

const consume = async () => {
    return new Promise((resolve, reject) => {
        amqp.connect(amqp_uri, (err, conn) => {
            if (err) return reject(err)

            return new Promise((resolve, reject) => {
                conn.createChannel((err, ch) => {
                    if (err) return reject(err)

                    let queue = 'dckrnd'
                    ch.assertQueue(queue, { durable: false })

                    console.log(`Waiting for message in %s. Queue: ${queue}`)

                    ch.consume(queue, async (msg) => {
                        let receive = JSON.parse(msg.content)
                        console.log(`Message ${JSON.stringify(receive)}`)

                        await runTask(receive.method, receive.params)

                        return resolve(receive)
                    }, {
                        noAck: true
                    })
                })
            })
        })
    })
}

const runTask = async (task_name, params) => {
    eval(task_name)

    return true
}

module.exports = {
    consume,
    test
}
