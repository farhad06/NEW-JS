const db = require('../db/dbConn');

const UserController = {
    home: (req, res) => {
        res.render('home', { title: 'Home' });
    },

    about: (req, res) => {
        res.render('about', { title: 'About Us' })
    },

    index: async (req, res) => {
        try {
            const [row] = await db.execute("SELECT * FROM users ORDER BY id DESC");
            res.render('users/index', { title: 'All Users', users: row });
        } catch (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong When Fetching Data');
            res.redirect('/');

        }
    },

    showUser: async (req, res) => {
        try {
            const [row] = await db.execute("SELECT * FROM users WHERE id = ?", [req.params.id]);
            console.log(row);
            const user = row[0];
            if (!user) return res.status(404).render('404', { title: 'User Not Found' })
            res.render('users/show', { title: user.name, user })
        } catch (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong When Show Data');
            res.redirect('/');

        }

    },

    greet: (req, res) => {
        res.send(`<h3>Hello ${req.query.name}</h3>`)
    }
}

module.exports = UserController;