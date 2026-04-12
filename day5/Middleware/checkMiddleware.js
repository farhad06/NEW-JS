function checkMiddleware(req, res, next) {

    if (req.query.name === 'farhad') {
        next();
    } else {
        res.send('Unauthorized accessed');
    }
}

module.exports = checkMiddleware;