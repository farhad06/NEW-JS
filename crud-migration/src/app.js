import express from 'express';
const app = express();

import sequelize from './config/dbConnect.js';
import './models/index.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Blog API running' }));


export default app;