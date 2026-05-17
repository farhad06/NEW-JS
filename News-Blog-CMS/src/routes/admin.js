const { Router } = require('express');

const userController = require('../controllers/userController.js');
const articleController = require('../controllers/articleController.js');
const categoryController = require('../controllers/categoryController.js');
const commentController = require('../controllers/commentController.js');
const authController = require('../controllers/authController.js')
const settingController = require('../controllers/settingController.js');

const router = Router();

//Auth Routes 
router.get('/', authController.logInPage);
router.post('/index', authController.adminLogin);
router.get('/dashboard', authController.dashboard);
router.get('/logout', authController.logout);

//Setting Routes
router.get('/settings', settingController.settings);
router.post('/save-settings', settingController.saveSettings);

//User CRUD Routes
router.get('/users', userController.allUsers);
router.get('/add-user', userController.addUserForm);
router.post('/add-user', userController.addUser);
router.get('/update-user/:id', userController.updateUserForm);
router.post('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

//Category CRUD Routes
router.get('/categories', categoryController.allCategories);
router.get('/add-category', categoryController.addCategoryForm);
router.post('/add-category', categoryController.addCategory);
router.get('/update-category/:id', categoryController.updateCategoryForm);
router.post('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

//Article CRUD Routes
router.get('/articles', articleController.allArticles);
router.get('/add-article', articleController.addArticleForm);
router.post('/add-article', articleController.addArticle);
router.get('/update-article/:id', articleController.updateArticleForm);
router.post('/update-article/:id', articleController.updateArticle);
router.delete('/delete-article/:id', articleController.deleteArticle);

//Comment Routes
router.get('/comments', commentController.allComments);
router.put('/update-comment-status/:id', commentController.updateCommentStatus);
router.delete('/delete-comment/:id', commentController.deleteComment);







module.exports = router;