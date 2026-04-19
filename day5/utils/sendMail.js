require('dotenv').config();
const transporter = require('../config/mail');

/*async function sendMail(toMail) {
    await transporter.sendMail({
        from: process.env.MAIL_FROM_NAME,
        to: toMail,
        subject: 'This is a Test Mail',
        text: 'Hello From Node.js',
        html: '<h2>Hello This is the first mail from nodejs</h2>'
    })
}

sendMail(toMail)*/

const sendMail = async (email, subject, name) => {
    return transporter.sendMail({
        from: process.env.MAIL_FROM_NAME,
        to: email,
        subject: subject,
        html: `<h3>Hello ${name}</h3>`
    })
}

module.exports = sendMail;