require('dotenv').config();
const app = require('./src/app.js');
const dbConnect = require('./src/config/dbConfig.js');

const PORT = process.env.APP_PORT || 8000;

const server = app.listen(PORT, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on ${PORT}`);
    } catch (err) {
        console.error(`Server Error While connect `, err);

    }
})