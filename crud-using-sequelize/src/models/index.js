import { BelongsTo } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import Employee from "./employee.js";
import EmployeeDetails from "./employeeDetails.js";


Employee.hasOne(EmployeeDetails, { foreignKey: "emp_id", as: "details" });

EmployeeDetails.belongsTo(Employee, { foreignKey: "emp_id", as: "employee" });


export { sequelize, Employee, EmployeeDetails };