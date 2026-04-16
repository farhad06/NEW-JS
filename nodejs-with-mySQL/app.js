const express = require('express');
const app = express();
const { dbConnection, sequelize } = require('./config/dbConnection')
//const { User } = require('./models/userModal')
//const { Employee } = require('./models/employeeModal');
//const { UserDetails } = require('./models/userDetails')

const port = 3000;

const router = require('./routes/router');

app.use('/', router);
//User.sync();
//User.sync({ alter: true });
//Employee.sync({ force: true });

(async () => {
    try {
        await sequelize.sync({ force: flase });
        console.log('Models sync Successfullty');
    } catch (err) {
        console.error('Error while sync db', err);
    }
})();


app.listen(port, async () => {

    try {
        await dbConnection();
        console.log(`Server Running On ${port}`);
    } catch (err) {
        console.error('Error While Connect the Server:', err);

    }
})