const express = require('express');
const route = express.Router();
const UserController = require('../Controllers/UserController');
const SignInController = require('../Controllers/SignInController');
const checkMiddleWare = require('../Middleware/checkMiddleware');
const uploadMiddleWare = require('../Middleware/uploadMiddleware');

route.get('/', UserController.home);
route.get('/about', UserController.about);
route.get('/users', UserController.index);
route.get('/user/:id', UserController.showUser);
route.get('/user/delete/:id', UserController.destroy);
route.get('/greet', checkMiddleWare, UserController.greet);


route.get('/show-form', SignInController.showForm);
route.post('/submit-reg-form', uploadMiddleWare.single('profile_photo'), SignInController.submitRegForm);
route.get('/send-mail', SignInController.sendMail);


module.exports = route;