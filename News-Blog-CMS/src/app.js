const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');

const userRoutes = require('./routes/frontEnd.js')
const adminRoutes = require('./routes/admin.js');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(expressLayouts);

app.set('layout', 'layout');

//View Folder Path
app.set('views', path.join(__dirname, 'views'));

//Set View Engine
app.set('view engine', 'ejs');

app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})

app.use('/', userRoutes);
app.use('/admin', adminRoutes);


module.exports = app;