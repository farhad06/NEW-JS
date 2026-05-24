// app.js — add this after flash middleware
app.use((req, res, next) => {
    // Flash messages (success / error strings)
    res.locals.success = req.flash('success')[0] || null;
    res.locals.error = req.flash('error')[0] || null;

    // Validation errors (object) and old input (object)
    const flashErrors = req.flash('errors')[0];
    const flashOld = req.flash('old')[0];

    res.locals.errors = flashErrors ? JSON.parse(flashErrors) : {};
    res.locals.old = flashOld ? JSON.parse(flashOld) : {};

    next();
});

// utils/validate.js
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = {};

        errors.array().forEach(err => {
            if (!formatted[err.path]) {
                formatted[err.path] = [];
            }
            formatted[err.path].push(err.msg);
        });

        // Store validation errors as flash
        req.flash('errors', JSON.stringify(formatted));

        // Store old input as flash so fields retain their values
        req.flash('old', JSON.stringify(req.body));

        return res.redirect('back');
    }

    next();
};

module.exports = validate;