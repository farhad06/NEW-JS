const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const transporter = require('../config/mail');

const sendMail = async ({ to, subject, template, data, attachments = [] }) => {

    // load template file
    const filePath = path.join(__dirname, `../views/emails/${template}.hbs`);
    const source = fs.readFileSync(filePath, 'utf8');

    // compile template
    const compiledTemplate = handlebars.compile(source);

    // inject data
    const html = compiledTemplate(data);

    // send mail
    return transporter.sendMail({
        from: {
            name: process.env.MAIL_FROM_NAME,
            address: process.env.MAIL_FROM_EMAIL
        },
        to,
        subject,
        html,
        attachments // 🔥 added
    });
};

module.exports = sendMail;