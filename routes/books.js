const express = require('express')
const router = express.Router()
const { create, getAll } = require("../actions/books")
const { isString } = require("lodash")
const CreateBook = require("../actions/books/create.action")
const Book = require("../models/book")
const Shop = require("../models/shop.model")

router.post("/", async (req, res) => {
    try {
        let { title, description, price, author, shop_id } = req.body
        price = parseInt(price)

        let data = await new CreateBook({
            title,
            description,
            price,
            author,
            shop_id
        }).exec()

        return res.send({
            status: "success",
            message: "Create book successfully",
            data
        })
    } catch(err) {
        return res.send({
            status: "error",
            message: err.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        let limit = 10,
            page = 1,
            sort = { created_at: -1 }
        let query = {}

        if(req.query.title) {
            query.title = req.query.title
        }

        if(req.query.limit) {
            limit = parseInt(req.query.limit)
        }

        if(req.query.page) {
            page = parseInt(req.query.page)
        }

        let populate = [
            {
                path: "shop_id",
                model: Shop
            }
        ]

        let data = await Book.paginate(
            query, {
                page,
                limit,
                sort,
                lean: true,
                populate
            }
        )

        let meta = {
            total: data.total,
            limit: data.limit,
            page: data.page,
            pages: data.pages
        }
        data = data.docs

        return res.send({
            status: "success",
            message: "book list",
            data,
            meta
        })
    } catch(err) {
        return res.send({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router
