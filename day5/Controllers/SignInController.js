const db = require('../db/dbConn');
const bcypt = require('bcrypt');
const logger = require('../utils/logger');
const sendMail = require('../utils/sendMail');

const SignInController = {
    showForm: (req, res) => {
        res.render('registration/form', { title: 'User Registration Form' })
    },

    submitRegForm: async (req, res) => {

        const { name, email, password, address } = req.body;
        const fileName = req.file ? `/uploads/images/${req.file.filename}` : null;

        const hashedPassword = await bcypt.hash(password, 10)

        try {

            await db.execute(
                "INSERT INTO users (name, email, password, address,profile_photo) VALUES (?,?,?,?,?)", [name, email, hashedPassword, address, fileName]
            );

            req.flash('success', 'User Saved Successfully');
            res.redirect('/users');

        } catch (err) {
            logger.error(err);
            req.flash('error', 'Something Went Wrong');
            res.redirect('/users')
        }

    },
    sendMail: async (req, res) => {
        try {
            const name = 'Farhad';
            const email = ['farhad.ahamed@webstep.in', 'iamfarhad06@gmail.com'];
            const subject = 'This is my first mail from nodeJs';

            await sendMail(email, subject, name);

            res.send('Mail Send Successfully');

        } catch (err) {
            //console.error(err);
            logger.error('Send Mail Error', err);
        }
    }
}


module.exports = SignInController;