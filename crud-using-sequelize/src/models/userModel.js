
import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        get(value) {
            const rawValue = this.getDataValue('firstName');
            return rawValue ? "Mr." + rawValue : null;
        }
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: {
        type: DataTypes.STRING(50),
        set(value) {
            this.setDataValue('phone', '+91' + value)
        }
    },
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('0', '1'),
        defaultValue: '1'
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
})


export default User;