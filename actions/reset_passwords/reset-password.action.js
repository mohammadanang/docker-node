const ResetPassword = require("../../models/reset_password.model")
const ShowPassword = require("./show.action")
const bcrypt = require("bcryptjs")
const User = require("../../models/user.model")

class Reset {
    constructor(password, token) {
        this.password = password
        this.token = token
    }

    async exec() {
        try {
            let data = await new ShowPassword({
                token: this.token
            }).exec()

            let password = bcrypt.hashSync(this.password, 8)
            let user = await User.findOne({
                email: data.email
            }).exec()

            if(user === null) {
                throw new Error("User not found")
            }

            let updateUser = await User.findOneAndUpdate({
                _id: user._id
            }, {
                password
            }).exec()

            await ResetPassword.findOneAndDelete({
                token: this.token
            }).exec()

            return updateUser
        } catch(err) {
            throw err
        }
    }
}

module.exports = Reset
