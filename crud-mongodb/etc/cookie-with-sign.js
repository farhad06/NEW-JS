// Setup with secret
app.use(cookieParser('my_secret_key'));

// Set signed cookie
app.get('/set-signed', (req, res) => {
    res.cookie('userId', '101', { signed: true });
    res.json({ message: 'Signed cookie set' });
});

// Read signed cookie
app.get('/read-signed', (req, res) => {
    const userId = req.signedCookies.userId;  // req.signedCookies not req.cookies

    if (!userId) {
        return res.status(401).json({ message: 'Cookie tampered or missing' });
    }

    res.json({ userId });
});