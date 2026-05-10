app.use(session({
    secret: 'strong_random_key',   // REQUIRED — sign the cookie
    resave: false,                 // don't resave unchanged sessions
    saveUninitialized: false,      // don't save empty sessions
    name: 'my_session',           // custom cookie name (default: connect.sid)
    store: MongoStore.create({ }),
    cookie: {
        maxAge: 1000 * 60 * 60,   // expiry in ms
        httpOnly: true,            // no JS access (XSS safe)
        secure: false,             // true = HTTPS only (production)
        sameSite: 'lax'           // CSRF protection
    }
}));