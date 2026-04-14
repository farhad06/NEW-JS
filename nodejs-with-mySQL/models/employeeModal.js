const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConnection')

class Employee extends Model { }

Employee.init(
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        email: { type: DataTypes.STRING(25) },
        phone: { type: DataTypes.INTEGER },
        dob: { type: DataTypes.DATEONLY }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Employee', // We need to choose the model name
        tableName: 'employees'
    },
);

// the defined model is the class itself
console.log(Employee === sequelize.models.Employee); // true


module.exports = { Employee };