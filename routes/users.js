const express = require('express')
const router = express.Router()
const { create, getAll } = require("../actions/users")

router.post("/", async (req, res) => {
    try {
        let data = await create(req)

        return res.status(200).json({
            status: "success",
            data,
            message: "User created successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        let data = await getAll()

        return res.send({
            status: "success",
            data,
            message: "Get all user data"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router
