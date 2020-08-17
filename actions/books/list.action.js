const Book = require("../../models/book")
const { Api } = require("api-inti")

class ListBook extends Api {
    constructor() {
        super(Book)
    }

    async exec(params, populate) {
        try {
            return await this.list(params, populate)
        } catch(err) {
            throw err
        }
    }
}

module.exports = new ListBook()
