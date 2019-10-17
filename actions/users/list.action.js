const User = require("../../models/user.model")
const API = require("../../core/action.core")

/**
 * This class using inheritence method
 */
class List extends API {
    constructor() {
        super(User)
    }

    async exec(req, res, next) {
        try {
            let params = {}
            let { name, email } = req.query

            if(name) {
                params.name = {
                    $regex: `${name}`,
                    $options: 'i'
                } // Query `LIKE` similar in SQL database
            }

            if(email) {
                params.email = email
            }

            let data = await this.list(params) // get function from parent class
            console.log(`data ${JSON.stringify(data)}`)

            return res.send({
                code: 200,
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

module.exports = List
