// config/app.js
require('dotenv').config();

module.exports = {
    name: process.env.APP_NAME || 'MyApp',
    env: process.env.APP_ENV || 'development',
    debug: process.env.APP_DEBUG === 'true',
    port: Number(process.env.PORT) || 3000,

    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    }
};