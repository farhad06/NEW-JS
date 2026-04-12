const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello user this is our home page</h1>');
});

app.get('/greet', (req, res) => {
    const userName = req.query.name ?? 'User';

    res.send(`<h3>Welcome ${userName}</h3>`);
});


app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'Rohit' }, { id: 2, name: 'Virat' }];

    res.send(users);
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);

})