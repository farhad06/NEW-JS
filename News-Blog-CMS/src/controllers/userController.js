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
            return res.redirect('/admin/users');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/add-user');
        }
    },
    updateUserForm: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                req.flash('error', 'User Not Found');
                return res.redirect('/admin/users');
            }
            res.render('admin/users/update', { user: user });
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/users');
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id, fullName, username, password, role } = req.body;

            const user = await User.findById(id);

            if (!user) {
                req.flash('error', 'User Not Found');
                return res.redirect('/admin/users');
            }

            user.fullName = fullName;
            user.username = username;
            user.role = role;

            if (password) {
                user.password = password
            }

            await user.save();

            req.flash('success', 'User Updated Successfully');
            return res.redirect('/admin/users');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/users');
        }
    },
    deleteUser: async (req, res) => {
        try {

            const user = await User.findById(req.params.id);

            if (!user) {
                req.flash('error', 'User Not Found');
                return res.redirect('/admin/users');
            }

            // const article = await newsModel.findOne({ author: id });
            // if (article) {
            //     return res.status(400).json({ success: false, message: 'User is associated with an article' });
            // }

            await user.deleteOne();

            return res.status(200).json({ success: true, message: 'User Deleted Successfully' });
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/users');
        }
    }
}


module.exports = userController;