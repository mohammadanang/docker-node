const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

/**
 * Send Mail using sendgrid
 * 
 * @param       params - [ 'to', 'subject', 'text', 'html' ]
 */
class SendMail {
    constructor(params) {
        this.params = params
    }

    async exec() {
        try {
            const options = {
                auth: {
                    api_user: process.env.EMAIL_USERNAME,
                    api_key: process.env.EMAIL_PASSWORD
                },
                secure: false
            }

            const transporter = await nodemailer.createTransport(
                sendgridTransport(options)
            )

            const data = {
                to: this.params.to.toString(), // string
                from: 'no-reply@demodock.com', // Totally up to you
                subject: this.params.subject,
                text: this.params.text,
                html: this.params.html
            }

            setTimeout(async () => {
                // Send Email
                return await transporter.sendMail(data, (error, resp) => {
                    if(error) {
                        console.log(error)
                    }
                })
            }, 600)
        } catch(err) {
            throw err
        }
    }
}

module.exports = SendMail
