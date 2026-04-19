import express from 'express';
const app = express();
import userRoutes from './routes/router.js';
import employeeRouter from './routes/employeeRoutes.js';
import User from './models/userModel.js';
import Employee from './models/employee.js';
import EmployeeDetails from './models/employeeDetails.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes);
app.use('/employees', employeeRouter);

//User.sync({ force: true });
//Employee.sync({ force: true });
//EmployeeDetails.sync({ force: true });


app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
});

export default app;