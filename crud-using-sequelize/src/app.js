import express from 'express';
const app = express();
import userRoutes from './routes/router.js';
import User from './models/userModel.js';


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);

//User.sync({ force: true });

app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
});

export default app;