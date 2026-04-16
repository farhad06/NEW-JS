const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnection');

const UserDetails = sequelize.define('UserDetails', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'user_details',
    timestamps: true,
    //createdAt: 'createdAt',
    //updatedAt: 'updatedAt',
    underscored: true,
});

console.log(UserDetails === sequelize.models.UserDetails); 

module.exports = { UserDetails }



