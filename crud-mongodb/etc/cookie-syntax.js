res.cookie('name', 'value', {
    maxAge: 1000 * 60 * 60, // expiry in milliseconds (1 hour)
    expires: new Date('2025-12-31'), // exact expiry date (use maxAge instead)
    httpOnly: true,           // JS cannot access — prevents XSS attacks
    secure: true,           // HTTPS only — set true in production
    signed: true,           // tamper-proof signed cookie
    sameSite: 'strict',       // CSRF protection: 'strict' | 'lax' | 'none'
    path: '/',            // cookie sent for all paths
    domain: '.example.com'  // share across subdomains
});