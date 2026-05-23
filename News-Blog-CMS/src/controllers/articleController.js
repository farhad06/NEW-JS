const Article = require('../models/News.js');
const Category = require('../models/Category.js');
const logger = require('../utils/logger.js');
const path = require('path');
const fs = require('fs');

const articleController = {
    allArticles: async (req, res) => {
        let articles;

        if (req.role === 'admin') {
            articles = await Article.find().populate('category', 'name').populate('author', 'fullName');
        } else {
            articles = await Article.find({ author: req.id }).populate('category', 'name').populate('author', 'fullName');
        }

        res.render('admin/articles/index', { articles, role: req.role });
    },
    addArticleForm: async (req, res) => {
        const categories = await Category.find();
        res.render('admin/articles/create', { role: req.role, categories });

    },
    addArticle: async (req, res) => {
        try {
            const { title, content, category } = req.body;

            const articleObj = {
                title: title,
                content: content,
                category: category,
                author: req.id,
                image: req.file.filename
            }

            const article = await Article.create(articleObj);
            req.flash('success', 'Article added Successfully');
            return res.redirect('/admin/articles');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/admin/articles');
        }
    },
    updateArticleForm: async (req, res) => {
        try {
            const article = await Article.findById(req.params.id).populate('category', 'name').populate('author', 'fullName');

            if (!article) {
                req.flash('error', 'Article Not Found');
                return res.redirect('/admin/articles');
            }

            if (req.role === 'author') {
                if (req.id != article.author._id) {
                    req.flash('error', 'You are Unauthorized to update this article');
                    return res.redirect('/admin/articles');
                }
            }

            const categories = await Category.find();

            res.render('admin/articles/update', { article, categories, role: req.role })
        } catch (err) {
            logger.error(err.message)
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/admin/articles');
        }

    },
    updateArticle: async (req, res) => {
        try {
            const { id, title, content, category } = req.body;

            const article = await Article.findById(id).populate('category', 'name').populate('author', 'fullName');

            if (!article) {
                req.flash('error', 'Article Not Found');
                return res.redirect('/admin/articles');
            }

            if (req.role === 'author') {
                if (req.id != article.author._id) {
                    req.flash('error', 'You are Unauthorized to edit this article');
                    return res.redirect('/admin/articles');
                }
            }

            article.title = title;
            article.content = content;
            article.category = category;

            if (req.file) {
                const imagePath = path.join(__dirname, '../../public/upload', article.image);
                fs.unlinkSync(imagePath);

                article.image = req.file.filename;
            }

            await article.save();

            req.flash('success', 'Article updated Successfully');
            return res.redirect('/admin/articles');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/admin/articles');
        }
    },
    deleteArticle: async (req, res) => {
        try {
            const id = req.params.id;

            const article = await Article.findById(id).populate('category', 'name').populate('author', 'fullName');

            if (!article) {
                req.flash('error', 'Article Not Found');
                return res.redirect('/admin/articles');
            }

            if (req.role === 'author') {
                if (req.id != article.author._id) {
                    req.flash('error', 'You are Unauthorized to delete this article');
                    return res.redirect('/admin/articles');
                }
            }

            const imagePath = path.join(__dirname, '../../public/upload', article.image);
            fs.unlinkSync(imagePath);
            await article.deleteOne();

            return res.status(200).json({ success: true, message: 'Article deleted Success' });
        } catch (err) {
            logger.error(err.message)
            req.flash('error', 'Something Went Wrong');
            return res.redirect('/admin/articles');
        }
    }
}


module.exports = articleController;