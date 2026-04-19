import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const EmployeeDetails = sequelize.define("EmployeeDetails", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: "employees",
            key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
    },
    bio: DataTypes.TEXT,
    address: DataTypes.TEXT,
    state: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    zip_code: DataTypes.STRING(20),



}, {
    tableName: "employee_details",
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
});

export default EmployeeDetails;