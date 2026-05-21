const articleController = {
    allArticles: async (req, res) => {
        res.render('admin/articles/index', { role: req.role });
    },
    addArticleForm: async (req, res) => {
        res.render('admin/articles/create', { role: req.role });

    },
    addArticle: async (req, res) => {

    },
    updateArticleForm: async (req, res) => {

    },
    updateArticle: async (req, res) => {

    },
    deleteArticle: async (req, res) => {

    }
}


module.exports = articleController;