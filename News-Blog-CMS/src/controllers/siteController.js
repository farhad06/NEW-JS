const Category = require('../models/Category.js');
const News = require('../models/News.js');
const User = require('../models/User.js');
const paginate = require('../utils/paginate.js');

const siteController = {
    index: async (req, res) => {
        const paginatedNews = await paginate(News, {}, req.query, {
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullName' }
            ],
            sort: '-createdAt'
        })
        //res.json(categories);
        res.render('index', { paginatedNews, query: req.query });
    },
    articleByCategories: async (req, res) => {
        const category = await Category.findOne({ slug: req.params.name });

        if (!category) {
            return res.redirect('/');
        }
        const paginatedNews = await paginate(
            News,
            { category: category._id },
            req.query,
            {
                populate: [
                    { path: 'category', select: 'name slug' },
                    { path: 'author', select: 'fullName' }
                ],
                sort: '-createdAt'
            }
        );

        res.render('category', { paginatedNews, category, query: req.query });
    },
    singleArticle: async (req, res) => {
        const singleNews = await News.findById(req.params.id)
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullName')
            .sort({ createdAt: -1 })

        if (!singleNews) {
            return res.redirect('/');
        }

        //res.json(singleNews)
        res.render('single', { singleNews });
    },
    search: async (req, res) => {

        const searchQuery = req.query.search;

        const paginatedNews = await paginate(
            News,
            {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { content: { $regex: searchQuery, $options: 'i' } },
                ]
            },
            req.query, {
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullName' }
            ]
        }
        )

        res.render('search', { searchQuery, paginatedNews, query: req.query })
    },
    author: async (req, res) => {
        const author = await User.find({ _id: req.params.name });

        if (!author) {
            return res.redirect('/');
        }
        const paginatedNews = await paginate(News, { author: req.params.name },
            req.query, {
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullName' }
            ],
            sort: '-createdAt'
        })
        //res.json(author);
        res.render('author', { paginatedNews, author, query: req.query })
    },
    addComment: async (req, res) => {

    },
}


module.exports = siteController;