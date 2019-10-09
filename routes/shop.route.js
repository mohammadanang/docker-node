const express = require('express')
const router = express.Router()
const Shop = require("../actions/shop.action")
const ShowShop = require("../actions/shops/show.action")
const CreateShop = require("../actions/shops/create.action")
const ListShop = require("../actions/shops/list.action")

router.post("/", async (req, res, next) => {
    try {
        let data = await new CreateShop(req).exec()

        return res.status(201).json({
            status: "success",
            data,
            message: "Shop created successfully"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/", async (req, res, next) => {
    try {
        let params = {}
        let search = {}

        let limit = parseInt(req.query.limit)
        if(!limit) {
            params.limit = 30
        } else {
            params.limit = limit
        }

        let page = parseInt(req.query.page)
        if(!page) {
            params.page = 1
        } else {
            params.page = page
        }

        let data = await new ListShop(search, params).exec()
        let meta = {
            total: data.total,
            limit: data.limit,
            page: data.page,
            pages: data.pages
        }
        data = data.data

        return res.status(200).json({
            status: "success",
            message: "Get all shop data",
            data,
            meta
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        let { id } = req.params
        let data = await new ShowShop(id).exec()
        console.log(`Type of ShowShop is ${typeof ShowShop}`)

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of shop"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router
