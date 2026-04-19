import { sequelize, Employee, EmployeeDetails } from "../models/index.js";

const employeeController = {
    getAllEmployee: async (req, res) => {
        try {
            // const employees = await Employee.findAll({
            //     include: [{
            //         model: EmployeeDetails,
            //         as: 'details'

            //     }], order: [['id', 'DESC']]
            // });


            const employees = await Employee.findAll({
                attributes: ['id', 'name', 'email', 'phone', ['department', 'dept'], 'salary'],
                include: [
                    {
                        model: EmployeeDetails,
                        as: 'details',
                        attributes: [['id', 'emp_details_id'], 'bio', 'country']
                    }
                ]
            })

            res.status(200).json(employees);

        } catch (err) {
            console.error(`Error While User Fetching`, err);
            res.status(500).json({ message: `Error While User Fetching` });

        }
    },
    store: async (req, res) => {
        const tran = await sequelize.transaction();
        try {

            const employee = await Employee.create({
                emp_code: `Emp-${Date.now()}`,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                department: req.body.department,
                designation: req.body.designation,
                salary: req.body.salary
            }, { transaction: tran });

            const employeeDetails = await EmployeeDetails.create({
                emp_id: employee.id,
                bio: req.body.bio,
                address: req.body.address,
                state: req.body.state,
                country: req.body.country,
                zip_code: req.body.zip_code,
            }, { transaction: tran });

            await tran.commit();

            res.status(201).json({
                message: `Employee Created Successfully`,
                data: employee
            });

        } catch (err) {
            await tran.rollback();
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: `Error While User Create`, error: err.message });

        }
    },
    update: async (req, res) => {
        try {


            res.status(200).json({
                message: `User Updated Successfully`,
                data: ''
            });

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: 'Error while User Update' });

        }
    },
    destroy: async (req, res) => {
        try {


            res.status(200).json({
                message: `User Deleted Successfully`,
                data: ''
            });

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: 'Error while User Delete' });
        }
    },
    show: async (req, res) => {
        try {



            return res.status(200).json();

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: `Error While User Fetching`, error: err.message });

        }
    }
}

export default employeeController;