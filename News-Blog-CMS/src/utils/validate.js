const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = {};

        errors.array().forEach(err => {
            if (!formatted[err.path]) {
                formatted[err.path] = [];
            }

            formatted[err.path].push(err.msg)
        });


        // return res.status(422).json({
        //     success: false,
        //     message: 'The given data was invalid',
        //     errors: formatted
        // });

        req.session.errors = formatted;
        req.session.old = req.body;   
        return res.redirect('back');
    }

    next();
}


module.exports = validate;