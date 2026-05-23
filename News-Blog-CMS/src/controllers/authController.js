const User = require('../models/User.js');
const Article = require('../models/News.js');
const Category = require('../models/Category.js');
const logger = require('../utils/logger.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    logInPage: async (req, res) => {
        res.render('admin/login', { layout: false });
    },
    adminLogin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                req.flash('error', 'Invalid User name or password');
                return res.redirect('/admin');
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                req.flash('error', 'Invalid User name or password');
                return res.redirect('/admin');
            }

            const jwtData = { id: user._id, fullName: user.fullName, role: user.role };
            const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
            res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            res.redirect('/admin/dashboard');
        } catch (err) {
            logger.error(err.message);
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/admin');
        }
    },
    dashboard: async (req, res) => {
        let articleCount;

        if (req.role === 'author') {
            articleCount = await Article.countDocuments({ author: req.id });
        } else {
            articleCount = await Article.countDocuments();
        }

        const categoryCount = await Category.countDocuments();
        const userCount = await User.countDocuments();


        res.render('admin/dashboard', {
            role: req.role,
            fullName: req.fullName,
            articleCount,
            categoryCount,
            userCount
        });
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.redirect('/admin/');
    }
}



module.exports = authController;