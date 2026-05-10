const flash = require('connect-flash');
app.use(flash());

// Set flash
app.post('/login', (req, res) => {
    req.flash('success', 'Login successful!');
    res.redirect('/dashboard');
});

// Read flash (auto-deleted after reading)
app.get('/dashboard', (req, res) => {
    const messages = req.flash('success');
    res.json({ flash: messages });
});