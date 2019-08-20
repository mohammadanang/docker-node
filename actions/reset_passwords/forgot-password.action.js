const ResetPassword = require("../../models/reset_password.model")
const User = require("../../models/user.model")
const { randomKey } = require("../../lib/helper")
const SendMail = require("../emails/send-mailtrap.action")

class ForgotPassword {
    constructor(email) {
        this.email = email
    }

    async exec() {
        try {
            let user = await User.findOne({ 
                email: this.email
            }).exec()
            if(user === null) {
                throw new Error("User not found")
            }

            let token = randomKey(54, 'aA#')
            let password = new ResetPassword({
                email: this.email, 
                token
            })
            await password.save()

            let request_data = {
                to: this.email,
                subject: 'Forgot Password',
                text: `Your token for reset password is: ${token}`,
                html: ''
            }

            await new SendMail(request_data).exec()

            return password
        } catch(err) {
            throw err
        }
    }
}

module.exports = ForgotPassword
