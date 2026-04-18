
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING(80),
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('0', '1'),
        defaultValue: '1'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
})


export default User;