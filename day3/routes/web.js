const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');


router.get('/', UserController.welcome);
router.get('/about', UserController.about);

module.exports = router;