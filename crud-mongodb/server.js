import app from "./src/app.js";
import "dotenv/config";
import dbConnect from "./src/config/dbConfig.js";

const PORT = process.env.APP_PORT || 3000;


const server = app.listen(PORT, async () => {
    try {
        await dbConnect();
        console.log(`App is listing at port number ${PORT}`);
    } catch (err) {
        console.error(`Error while connect Server`, err);
    }
})