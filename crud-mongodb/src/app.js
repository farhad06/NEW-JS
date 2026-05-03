import express from "express";
const app = express();

import router from "./routes/router.js";

app.use(express.json());

app.use("/users", router);

export default app;