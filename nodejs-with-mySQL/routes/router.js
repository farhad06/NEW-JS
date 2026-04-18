const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

//router.post('/register', userController.insert);
router.get('/register', userController.insert);
router.get('/show-all-users', userController.showAllUser);



module.exports = router;