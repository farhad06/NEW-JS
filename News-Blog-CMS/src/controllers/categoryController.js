const categoryController = {
    allCategories: async (req, res) => {
        res.render('admin/categories/index', { role: req.role });

    },
    addCategoryForm: async (req, res) => {

    },
    addCategory: async (req, res) => {

    },
    updateCategoryForm: async (req, res) => {

    },
    updateCategory: async (req, res) => {

    },
    deleteCategory: async (req, res) => {

    }
}


module.exports = categoryController;