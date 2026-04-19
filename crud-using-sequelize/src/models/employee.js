import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Employee = sequelize.define("Employee", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is required" },
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Invalid email" },
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  role: {
    type: DataTypes.ENUM("admin", "manager", "employee"),
    defaultValue: "employee",
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

}, {
  tableName: "employees",
  timestamps: true,
  underscored: true,
  paranoid: true,
  freezeTableName: true,
});

/*Employee.fillable = [
  "emp_code", "name", "email", "phone",
  "department", "designation", "salary",
  "role", "is_active",
];

Employee.filterFillable = (data) => {
  const filtered = {};
  Employee.fillable.forEach(field => {
    if (data[field] !== undefined) filtered[field] = data[field];
  });
  return filtered;
};*/

export default Employee;