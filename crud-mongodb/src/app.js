import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cookieRoutes from "./routes/cookie.js"
import authRoutes from "./routes/auth.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser());
//app.use(cookieParser('mySectectKey')); // Signed  Cookie Parser

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/session_store_db',
        //ttl: 60 * 60
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
}))



app.use("/users", router);
app.use("/", cookieRoutes);
app.use("/user", authRoutes);

export default app;