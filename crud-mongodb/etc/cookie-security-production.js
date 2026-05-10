res.cookie('token', value, {
    httpOnly: true,    // ✅ blocks XSS
    secure: true,    // ✅ HTTPS only
    sameSite: 'lax',  // ✅ blocks CSRF
    signed: true,    // ✅ blocks tampering
    maxAge: 1000 * 60 * 60  // ✅ auto expiry
});