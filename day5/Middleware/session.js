function succSession(req, res, next) {
    res.locals.success = req.flash('success');
    next();
}

function errorSession(req, res, next) {
    res.locals.error = req.flash('error');
    next();
}


module.exports = { succSession, errorSession }