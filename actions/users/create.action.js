const User = require("../../models/user.model")
const API = require("../../core/action.core")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")

class Create extends API {
    constructor() {
        super(User)
    }

    async exec(req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send({
                code: 422,
                status: "error",
                message: errors.array()
            })
        }

        try {
            let { name, email, phone, password } = req.body
            password = bcrypt.hashSync(password, 8) // params: password, salt
            console.log(`Hashing password ${password}`)
            let request_data = {
                name,
                email,
                phone,
                password
            }

            let data = await this.create(request_data)

            return res.send({
                code: 201,
                status: "success",
                data
            })
        } catch(err) {
            return res.send({
                code: 400,
                status: "error",
                message: err.message
            })
        }
    }
}

module.exports = Create
