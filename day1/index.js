const http = require('http');
const url = require('url');
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.url == '/') {
        res.end('Welcome to User');

    } else if (req.url == '/about') {
        res.end('This is my about page');

    } else if (req.url == '/users') {
        const users = [
            { id: 1, name: 'Rohit' },
            { id: 2, name: 'Virat' }
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));

    } else {
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const userName = query.name;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h3>Hello ${userName}</h3>`);  
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});