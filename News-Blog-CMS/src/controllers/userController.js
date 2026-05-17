const User = require('../models/User.js');

const logger = require('../utils/logger.js')

const userController = {
    allUsers: async (req, res) => {
        const users = await User.find();

        res.render('admin/users', { users: users })
    },
    addUserForm: async (req, res) => {
        res.render('admin/users/create')
    },
    addUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            req.flash('success', 'User Added Successfully');
            res.redirect('/admin/users');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            res.redirect('/admin/add-user');
        }
    },
    updateUserForm: async (req, res) => {

    },
    updateUser: async (req, res) => {

    },
    deleteUser: async (req, res) => {

    }
}


module.exports = userController;