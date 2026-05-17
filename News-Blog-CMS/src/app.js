const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const session = require('express-session');
const errorHandler = require('./middlewares/errorMiddleware.js');

const userRoutes = require('./routes/frontEnd.js')
const adminRoutes = require('./routes/admin.js');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(expressLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: true
}))
app.use(flash());

app.set('layout', 'layout');

//View Folder Path
app.set('views', path.join(__dirname, 'views'));

//Set View Engine
app.set('view engine', 'ejs');

app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})

app.use((req, res, next) => {

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
});

app.use('/', userRoutes);
app.use('/admin', adminRoutes);


//app.use(errorHandler);

module.exports = app;