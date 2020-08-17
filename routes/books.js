const express = require('express')
const router = express.Router()
const { create, getAll } = require("../actions/books")
const { isString } = require("lodash")
const CreateBook = require("../actions/books/create.action")
const Book = require("../models/book")
const Shop = require("../models/shop.model")
const e = require("events")
const ee = new e.EventEmitter()
const ShopListener = require("../listeners/shop.listener")
const { LogListener } = require("api-inti")
const BookController = require("../controllers/books.controller")

router.post("/", async (req, res) => {
    try {
        LogListener(ee)
        // let on = ShopListener(ee)
        // console.log(`on ${on}`)
        
        let { title, description, price, author, shop_id } = req.body
        let inputs = {
            title,
            description
        }
        
        if(price) {
            price = parseInt(price)
            inputs.price = price
        }

        if(author) {
            inputs.author = author
        }

        if(shop_id) {
            inputs.shop_id
        }

        let data = await new CreateBook(inputs).exec()

        let log = {
            model: "Books",
            model_id: data._id,
            value: data,
            action: "create book",
            type: "success",
            notes: "Log create book success"
        }
        let logs = ee.emit("log.custom", log)
        // let logs = ee.emit("shop.test", log)
        console.log(`emit ${logs}`)

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

router.get("/list", async (req, res) => await BookController.index(req, res))
router.get("/paginate", async (req, res) => await BookController.paginate(req, res))

module.exports = router
