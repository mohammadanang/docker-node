const apiCore = require("api-inti")
const User = require("../../models/user.model")
const { Api } = apiCore

class All extends Api {
    constructor() {
        super(User)
    }

    async exec() {
        try {
            let data = await this.list()

            return data
        } catch(err) {
            throw err
        }
    }
}

module.exports = All
