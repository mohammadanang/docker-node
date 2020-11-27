const nodemailer = require('nodemailer');

/**
 * Send Mail using mailtrap
 *
 * @param       params - [ 'to', 'subject', 'text', 'html' ]
 */
class SendMailtrap {
  constructor(params) {
    this.params = params;
  }

  async exec() {
    const options = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    const transporter = await nodemailer.createTransport(options);

    const data = {
      to: this.params.to.toString(), // string
      from: 'no-reply@demodock.com', // Totally up to you
      subject: this.params.subject,
      text: this.params.text,
      html: this.params.html,
    };

    setTimeout(async () => {
      // Send Email
      const result = await transporter.sendMail(data, (error) => {
        if (error) {
          // console.log(error);
          throw new Error(error);
        }
      });

      return result;
    }, 600);
  }
}

module.exports = SendMailtrap;
