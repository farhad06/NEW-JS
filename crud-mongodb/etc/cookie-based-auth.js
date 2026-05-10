const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser('secret_key'));

// Login — set cookie
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'farhad' && password === '1234') {
        res.cookie('auth_user', JSON.stringify({ id: 1, name: 'Farhad' }), {
            signed: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60  // 1 hour
        });
        return res.json({ message: 'Logged in' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware — check cookie
const cookieAuth = (req, res, next) => {
    const user = req.signedCookies.auth_user;

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = JSON.parse(user);  // attach to request
    next();
};

// Protected route
app.get('/dashboard', cookieAuth, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` });
});

// Logout — clear cookie
app.post('/logout', (req, res) => {
    res.clearCookie('auth_user');
    res.json({ message: 'Logged out' });
});

//app.listen(3000, () => console.log('Running on port 3000'));