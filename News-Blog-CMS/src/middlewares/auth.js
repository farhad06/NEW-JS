const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect('/admin/');

        const jwtData = jwt.verify(token, process.env.JWT_SECRET);

        req.id = jwtData.id;
        req.role = jwtData.role;
        req.fullName = jwtData.fullName;

        next();
        
    } catch (err) {
        res.status(401).send('Unauthorized: Invalid token');
    }
}



module.exports = auth;