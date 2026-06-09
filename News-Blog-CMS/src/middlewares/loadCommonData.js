const Category = require('../models/Category.js');
const News = require('../models/News.js');
const Setting = require('../models/Setting.js');


const loadCommonData = async (req, res, next) => {

    try {
        const settings = await Setting.findOne();

        const latestNews = await News.find()
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullName')
            .sort({ createdAt: -1 })
            .limit(5);

        const categoryInUse = await News.distinct('category')
        const categories = await Category.find({ '_id': { $in: categoryInUse } })

        res.locals.settings = settings;
        res.locals.latestNews = latestNews;
        res.locals.categories = categories;

        next();
    } catch (err) {
        next(err)
    }

}

module.exports = loadCommonData;