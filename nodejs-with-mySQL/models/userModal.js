const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnection');

const User = sequelize.define(
    'User',
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
        email: {
            type: DataTypes.STRING
        }
    },
    {
        // Other model options go here
        //When model name & table name are same
        //freezeTableName: true

        //When model name & table name different 
        tableName: 'users',

        // ✅ Add these options
        timestamps: true,        // enable createdAt & updatedAt
        createdAt: 'createdAt',  // keep the column name
        updatedAt: 'updatedAt',

        // ✅ This stores as UNIX integer timestamp instead of DATETIME
        underscored: false,

    },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true


module.exports = { User }