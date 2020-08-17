const Book = require("../../models/book")
const { Api } = require("api-inti")

class PaginateBook extends Api {
    constructor() {
        super(Book)
    }

    async exec(params, populate, options) {
        try {
            return await this.paginate(params, populate, options)
        } catch(err) {
            throw err
        }
    }
}

module.exports = new PaginateBook()
