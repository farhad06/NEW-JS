const express = require('express');
const route = express.Router();
const UserController = require('../Controllers/UserController');
const SignInController = require('../Controllers/SignInController');
const checkMiddleWare = require('../Middleware/checkMiddleware');

route.get('/', UserController.home);
route.get('/about', UserController.about);
route.get('/users', UserController.index);
route.get('/users/:id', UserController.showUser);
route.get('/greet', checkMiddleWare, UserController.greet);


route.get('/show-form', SignInController.showForm);
route.post('/submit-reg-form', SignInController.submitRegForm);


module.exports = route;