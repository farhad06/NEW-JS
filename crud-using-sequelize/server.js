import 'dotenv/config';
import app from './src/app.js';
import { dbConnect } from './src/config/dbConfig.js';

const port = process.env.APP_PORT || 8000;


const server = app.listen(port, async () => {
    try {
        await dbConnect();
        console.log(`App is listing at port number ${port}`);
    } catch (err) {
        console.error(`Error while connect Server`);

    }
})