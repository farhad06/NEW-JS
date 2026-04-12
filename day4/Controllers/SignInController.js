const db = require('../db/dbConn');

const SignInController = {
    showForm: (req, res) => {
        res.render('registration/form', { title: 'User Registration Form' })
    },

    submitRegForm: (req, res) => {

        //const formData = req.body;
        //res.render('registration/showData', { title: 'Show Submitted Data', formData });

        const { name, email, password, address } = req.body;

        const sql = "INSERT INTO users (name,email,password,address) VALUES (?,?,?,?)";

        db.query(sql, [name, email, password, address], (err, result) => {

            if (err) {
                console.log(err);
                return res.send('Database Error');

            }

            res.render('registration/success', { title: "Success Message" });
        })

    }
}


module.exports = SignInController;