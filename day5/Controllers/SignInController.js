const db = require('../db/dbConn');
const bcypt = require('bcrypt');

const SignInController = {
    showForm: (req, res) => {
        res.render('registration/form', { title: 'User Registration Form' })
    },

    submitRegForm: async (req, res) => {

        const { name, email, password, address } = req.body;

        const hashedPassword = await bcypt.hash(address, 10)

        try {

            await db.execute(
                "INSERT INTO users (name, email, password, address) VALUES (?,?,?,?)", [name, email, hashedPassword, address]
            );

            req.flash('success', 'User Saved Successfully');
            res.redirect('/');

        } catch (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong');
            res.redirect('/')
        }

    }
}


module.exports = SignInController;