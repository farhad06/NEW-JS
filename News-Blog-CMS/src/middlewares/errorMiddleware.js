const logger = require('../utils/logger.js');


const errorHandler = (err, req, res, next) => {

    logger.error(err.message);

    res.status(500).render('admin/500.ejs', {
        title: 'Internal Server Error',
        message: err.message
    });
};

module.exports = errorHandler;


/*function succSession(req, res, next) {
    res.locals.success = req.flash('success');
    next();
}

function errorSession(err, req, res, next) {
    logger.error(err.message)
    res.locals.error = req.flash('error');
    next();
}


module.exports = { succSession, errorSession }
*/