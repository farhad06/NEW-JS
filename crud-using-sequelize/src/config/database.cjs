// // .cjs extension = CommonJS — sequelize-cli needs this
// // this is ONLY for CLI commands — your app still uses dbConnect.js

// //require('dotenv').config();

// module.exports = {
//     development: {
//         username: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT || 3306,
//         dialect: process.env.DB_CONN || 'mysql',
//         logging: false,
//     },
//     production: {
//         username: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT || 3306,
//         dialect: process.env.DB_CONN || 'mysql',
//         logging: false,
//     },
// };