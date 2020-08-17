const UpdateShop = require("../actions/shops/update.action")
const ShowShop = require("../actions/shops/show.action")

const shop = {
    add_qty: async data => {
        try {
            let _id = data.shop_id
            let shop = await new ShowShop(_id).exec()
            console.log(`Shop book qty ${shop.book_qty}`)
            let book_qty = parseInt(shop.book_qty) + 1

            let update = await new UpdateShop({ _id }, { book_qty }).exec()
            console.log(`Shop updated ${JSON.stringify(update)}`)
        } catch(err) {
            throw err
        }
    },
    test: async (data) => {
        try {
            console.log(`Listener test: ${JSON.stringify(data)}`)
        } catch(e) {
            console.log(`Listener test error: ${JSON.stringify(e)}`)
        }
    }
}

module.exports = eventEmitter => {
    eventEmitter.on("shop.add-qty", shop.add_qty)
    eventEmitter.once("shop.test", shop.test)
}
