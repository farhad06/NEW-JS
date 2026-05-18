const { Router } = require('express');
const router = Router();

//Controllers
const userController = require('../controllers/userController.js');
const articleController = require('../controllers/articleController.js');
const categoryController = require('../controllers/categoryController.js');
const commentController = require('../controllers/commentController.js');
const authController = require('../controllers/authController.js')
const settingController = require('../controllers/settingController.js');

//Middlewars
const auth = require('../middlewares/auth.js');
const isAdmin = require('../middlewares/isAdmin.js');

//Auth Routes 
router.get('/', authController.logInPage);
router.post('/index', authController.adminLogin);
router.get('/dashboard', auth, authController.dashboard);
router.get('/logout', auth, authController.logout);

//Setting Routes
router.get('/settings', auth, isAdmin, settingController.settings);
router.post('/save-settings', auth, isAdmin, settingController.saveSettings);

//User CRUD Routes
router.get('/users', auth, isAdmin, userController.allUsers);
router.get('/add-user', auth, isAdmin, userController.addUserForm);
router.post('/add-user', auth, isAdmin, userController.addUser);
router.get('/update-user/:id', auth, isAdmin, userController.updateUserForm);
router.post('/update-user', auth, isAdmin, userController.updateUser);
router.delete('/delete-user/:id', auth, isAdmin, userController.deleteUser);

//Category CRUD Routes
router.get('/categories', auth, isAdmin, categoryController.allCategories);
router.get('/add-category', auth, isAdmin, categoryController.addCategoryForm);
router.post('/add-category', auth, isAdmin, categoryController.addCategory);
router.get('/update-category/:id', auth, isAdmin, categoryController.updateCategoryForm);
router.post('/update-category/:id', auth, isAdmin, categoryController.updateCategory);
router.delete('/delete-category/:id', auth, isAdmin, categoryController.deleteCategory);

//Article CRUD Routes
router.get('/articles', auth, articleController.allArticles);
router.get('/add-article', auth, articleController.addArticleForm);
router.post('/add-article', auth, articleController.addArticle);
router.get('/update-article/:id', auth, articleController.updateArticleForm);
router.post('/update-article/:id', auth, articleController.updateArticle);
router.delete('/delete-article/:id', auth, articleController.deleteArticle);

//Comment Routes
router.get('/comments', auth, commentController.allComments);
router.put('/update-comment-status/:id', auth, commentController.updateCommentStatus);
router.delete('/delete-comment/:id', auth, commentController.deleteComment);




module.exports = router;