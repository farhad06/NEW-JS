const db = require('../db/dbConn');
const bcypt = require('bcrypt');
const logger = require('../utils/logger')

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

    }
}


module.exports = SignInController;