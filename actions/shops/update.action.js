const Shop = require("../../models/shop.model")

class Update {
    constructor(params, updated) {
        this.params = params,
        this.updated = updated
    }

    async exec() {
        try {
            let update = await Shop.findOneAndUpdate(
                this.params,
                this.updated, 
                {
                    new: true
                }).exec()

            return update
        } catch(err) {
            throw err
        }
    }
}

module.exports = Update
