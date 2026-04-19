const sendMail = require('../services/mailService');

sendMailController: async (req, res) => {
    try {
        await sendMail({
            to: 'user@gmail.com',
            subject: 'Welcome Mail',
            template: 'welcome',
            data: {
                name: 'Farhad',
                email: 'user@gmail.com',
                appName: 'My App'
            },
            attachments: [
                {
                    filename: 'file.pdf',
                    path: './uploads/file.pdf'
                }
            ]
        });

        res.send('Mail Sent Successfully');

    } catch (err) {
        console.error(err);
    }
}