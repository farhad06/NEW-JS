require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

const port = process.env.APP_PORT || 3000
const appName = process.env.APP_NAME


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))


app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const webRoutes = require('./routes/web');

app.use('/', webRoutes);


app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Found' });
});

app.listen(port, () => {
    console.log(`${appName} running at port ${port}`);
});