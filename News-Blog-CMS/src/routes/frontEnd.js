const { Router } = require('express');
const siteController = require('../controllers/siteController.js');
const router = Router();


router.get('/', siteController.index);
router.get('/category/:name', siteController.articleByCategories);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:name', siteController.author);
router.post('/single/:id/comment', siteController.addComment);



module.exports = router;