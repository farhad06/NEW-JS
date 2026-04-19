const db = require('../db/dbConn');
const logger = require('../utils/logger')
const path = require('path');
const fs = require('fs');

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

            const user = row[0];
            if (!user) return res.status(404).render('404', { title: 'User Not Found' })
            res.render('users/show', { title: user.name, user })
        } catch (err) {
            logger.error('Date Show Error', err);
            req.flash('error', 'Something Went Wrong When Show Data');
            res.redirect('/users');

        }

    },

    greet: (req, res) => {
        res.send(`<h3>Hello ${req.query.name}</h3>`)
    },

    destroy: async (req, res) => {
        try {
            const [row] = await db.execute("SELECT * FROM users WHERE id = ?", [req.params.id]);
            const user = row[0];

            if (!user) {
                req.flash('error', 'User not found');
                return res.redirect('/users');
            }

            if (user.profile_photo) {
                const filePath = path.join(__dirname, '../public', user.profile_photo);

                if (fs.existsSync(filePath)) {
                    //fs.unlinkSync(filePath);
                    
                    fs.unlink(filePath, (err) => {
                        if (err) logger.error('File delete error', err);
                    });

                }
            }

            await db.execute("DELETE FROM users WHERE id = ?", [req.params.id])

            req.flash('success', 'Successfully Deleted User');
            res.redirect('/users');
        } catch (err) {
            logger.error('User Delete Error: ', err);
            req.flash('error', 'Something Went Wrong When Show Data');
            res.redirect('/users');
        }
    }
}

module.exports = UserController;