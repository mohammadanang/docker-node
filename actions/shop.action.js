const ShopModel = require("../models/shop.model")
const ListShop = require("../actions/shops/list.action")

class Shop {
    static async create(req) {
        try {
            let { name, description, owner } = req.body
            let data = new ShopModel({
                name,
                description,
                owner
            })

            await data.save()

            return data
        } catch(err) {
            throw err
        }
    }

    static async all() {
        try {
            let search = {}
            let params = {
                limit: 50,
                page: 1
            }

            let data = await new ListShop(search, params).exec()

            return data
        } catch(err) {
            throw err
        }
    }

    hello() {
        return 'Hello Shop!'
    }
}

module.exports = Shop
