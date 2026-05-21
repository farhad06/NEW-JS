const Category = require('../models/Category.js');
const logger = require('../utils/logger.js');

const categoryController = {
    allCategories: async (req, res) => {
        const categories = await Category.find();
        res.render('admin/categories/index', { categories: categories, role: req.role });

    },
    addCategoryForm: async (req, res) => {
        res.render('admin/categories/create', { role: req.role });

    },
    addCategory: async (req, res) => {
        try {
            const category = await Category.create(req.body);
            req.flash('success', 'Category Added Successfully');
            return res.redirect('/admin/categories');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/add-category');
        }
    },
    updateCategoryForm: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                req.flash('error', "Category not found");
                return res.redirect('/admin/categories');
            }

            res.render('admin/categories/update', { category: category, role: req.role });
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/categories');
        }

    },
    updateCategory: async (req, res) => {
        try {
            const { id, name, description } = req.body;

            const category = await Category.findById(id);

            if (!category) {
                req.flash('error', "Category not found");
                return res.redirect('/admin/categories');
            }

            category.name = name;
            category.description = description;

            await category.save();

            req.flash('success', 'Category Updated Successfully');
            return res.redirect('/admin/categories');
        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/categories');
        }
    },
    deleteCategory: async (req, res) => {
        try {
           
            const category = await Category.findById(req.params.id);

            if (!category) {
                req.flash('error', "Category not found");
                return res.redirect('/admin/categories');
            }
            // const article = await newsModel.findOne({ category: id });
            // if (article) {
            //     return res.status(400).json({ success: false, message: 'Category is associated with an article' });
            // }

            await category.deleteOne();

            return res.status(200).json({ success: true, message: 'Category Deleted Successfully' })

        } catch (err) {
            logger.error(err.message)
            req.flash('error', err.message);
            return res.redirect('/admin/categories');
        }
    }
}


module.exports = categoryController;