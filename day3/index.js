const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webRoutes = require('./routes/web');

app.use('/', webRoutes);


//for 404 handel

app.use((req, res) => {
    res.status(404).render(404);
});




app.listen(port, () => {
    console.log(`Server listing at port ${port}`);
})
