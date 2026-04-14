const express = require('express');
const app = express();
const { dbConnection } = require('./config/dbConnection')
const { User } = require('./models/userModal')
const { Employee } = require('./models/employeeModal');

const port = 3000;

const router = require('./routes/router');

app.use('/', router);
//User.sync();
//User.sync({ alter: true });
Employee.sync({ force: true });


app.listen(port, async () => {
    console.log(`Server Running On ${port}`);
    await dbConnection();
})