const { Controller } = require("api-inti")
const ListBook = require("../actions/books/list.action")
const PaginateBook = require("../actions/books/paginate.action")

class BookController extends Controller {
    constructor() {
        super()
    }

    async index(req, res) {
        try {
            let { title, author } = req.query
            let params = {}
            if(title) {
                params.title = {
                    $regex: `${title}`,
                    $options: 'i'
                } // LIKE query in mongodb
            }

            if(author) {
                params.author = {
                    $regex: `${author}`,
                    $options: 'i'
                } // LIKE query in mongodb
            }

            let data = await ListBook.exec(params)

            return res.send(
                this.success({
                    message: "Get books successfully",
                    data
                })
            )
        } catch(err) {
            return res.send(
                this.error({
                    message: err.message
                })
            )
        }
    }

    async paginate(req, res) {
        try {
            let limits = 10, pages = 1, sort = { created_at: -1 }
            let params = {}, options = {}, population = []
            let { title, author, limit, page } = req.query
            if(title) {
                params.title = {
                    $regex: `${title}`,
                    $options: 'i'
                } // LIKE query in mongodb
            }

            if(author) {
                params.author = {
                    $regex: `${author}`,
                    $options: 'i'
                } // LIKE query in mongodb
            }

            if(limit) {
                limits = parseInt(limit)
            }

            if(page) {
                pages = parseInt(page)
            }

            if(limits) {
                options.limit = limits
            }

            if(pages) {
                options.page = pages
            }

            if(sort) {
                options.sort = sort
            }

            if(population) {
                options.populate = population
            }

            let data = await PaginateBook.exec(params, population)

            return res.send(
                this.success({
                    message: "Get book pagination successfully",
                    data: data.data,
                    meta: data.meta
                })
            )
        } catch(err) {
            return res.send(
                this.error({
                    message: err.message
                })
            )
        }
    }
}

module.exports = new BookController()
