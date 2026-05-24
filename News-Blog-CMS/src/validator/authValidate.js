const { body } = require('express-validator');

const loginRules = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')
        .isLength({ min: 5, max: 12 })
        .withMessage('Username must be 5 to 10 characters long'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 12 })
        .withMessage('Password must be 5 to 12 characters long')
];

const registerRules = [
    body('fullName')
        .notEmpty().withMessage('The name field is required.')
        .isLength({ min: 3 }).withMessage('The name must be at least 3 characters.'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')
        .isLength({ min: 5, max: 12 })
        .withMessage('Username must be 5 to 10 characters long'),


    body('password')
        .notEmpty().withMessage('The password field is required.')
        .isLength({ min: 8 }).withMessage('The password must be at least 8 characters.')
        .isStrongPassword().withMessage('The password must contain uppercase, lowercase, number and symbol.'),
    body('role')
        .notEmpty().withMessage('Role is Required')

    // body('password_confirmation')
    //     .notEmpty().withMessage('The password confirmation field is required.')
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password) {
    //             throw new Error('The password confirmation does not match.');
    //         }
    //         return true;
    //     }),
];

module.exports = { loginRules, registerRules }