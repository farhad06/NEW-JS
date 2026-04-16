require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('./utils/logger');
const path = require('path');

const { succSession, errorSession } = require('./Middleware/session');

const port = process.env.APP_PORT || 3000
const appName = process.env.APP_NAME


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))


app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}))


app.use(flash());
app.use(succSession);
app.use(errorSession);

app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('public/', express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));


const webRoutes = require('./routes/web');

app.use('/', webRoutes);


app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Found' });
});

const server = app.listen(port, () => {
    console.log(`${appName} running at port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error("Some Unhandle Promises ", err);
    server.close(() => process.exit(1));
});