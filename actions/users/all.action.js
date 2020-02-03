const apiCore = require("api-inti")
const User = require("../../models/user.model")
const { Api } = apiCore

class All extends Api {
    constructor() {
        super(User)
    }

    async exec(params) {
        try {
            return await this.list(params)
        } catch(err) {
            throw err
        }
    }
}

module.exports = new All()
