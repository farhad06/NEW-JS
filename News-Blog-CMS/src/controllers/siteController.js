const Category = require('../models/Category.js');
const News = require('../models/News.js');
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

        const categoryInUse = await News.distinct('category')
        const categories = await Category.find({ '_id': { $in: categoryInUse } })

        //res.json(categories);
        res.render('index', { paginatedNews, categories, query: req.query });
    },
    articleByCategories: async (req, res) => {

    },
    singleArticle: async (req, res) => {

    },
    search: async (req, res) => {

    },
    author: async (req, res) => {

    },
    addComment: async (req, res) => {

    },
}


module.exports = siteController;