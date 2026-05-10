// Store any data in session
req.session.user = { id: 1, name: 'Farhad' };
req.session.cart = [{ productId: 5, qty: 2 }];
req.session.lastPage = '/dashboard';

// Read session data
console.log(req.session.user);
console.log(req.session.id);       // session ID

// Update session data
req.session.user.role = 'editor';

// Delete one key
delete req.session.cart;

// Manually save session (usually auto-saved)
req.session.save((err) => { });

// Destroy entire session
req.session.destroy((err) => { });

// Regenerate session ID (security: after login)
req.session.regenerate((err) => {
    req.session.user = { id: 1, name: 'Farhad' };
    res.json({ message: 'Logged in' });
});