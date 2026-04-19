// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {

//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('employees', {

//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       emp_code: {
//         type: Sequelize.STRING(20),
//         allowNull: false,
//         unique: true,
//       },
//       name: {
//         type: Sequelize.STRING(100),
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING(100),
//         allowNull: false,
//         unique: true,
//       },
//       phone: {
//         type: Sequelize.STRING(20),
//         allowNull: true,
//       },
//       department: {
//         type: Sequelize.STRING(100),
//         allowNull: true,
//       },
//       designation: {
//         type: Sequelize.STRING(100),
//         allowNull: true,
//       },
//       salary: {
//         type: Sequelize.DECIMAL(10, 2),
//         defaultValue: 0.00,
//       },
//       role: {
//         type: Sequelize.ENUM('admin', 'manager', 'employee'),
//         defaultValue: 'employee',
//       },
//       is_active: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: true,
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//       updated_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
//       },
//       deleted_at: {
//         type: Sequelize.DATE,
//         allowNull: true,
//       },
//     });
//   },

//   down: async (queryInterface) => {
//     await queryInterface.dropTable('employees');
//   }
// };