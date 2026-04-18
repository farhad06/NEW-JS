import User from '../models/userModel.js';

const userController = {
    getAllUser: async (req, res) => {
        try {

            const data = await User.findAll();

            res.status(200).json(data);
        } catch (err) {
            console.error(`Error While User Fetching`, err);
            res.status(500).json({ message: `Error While User Fetching` });

        }
    },
    store: async (req, res) => {
        try {
            const { first_name, last_name, email, phone, age, password } = req.body;
            const user = await User.create({ first_name, last_name, email, phone, age, password });
            
            res.status(201).json({
                message: `User Created Successfully`,
                data: user
            });
        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: `Error While User Create`, error: err.message });

        }
    },
    edit: async (req, res) => {
        try {

        } catch (err) {
            console.error(`Error while Store User`, err);

        }
    },
    update: async (req, res) => {
        try {

        } catch (err) {
            console.error(`Error while Store User`, err);

        }
    },
    destroy: async (req, res) => {
        try {

        } catch (err) {
            console.error(`Error while Store User`, err);

        }
    },
    show: async (req, res) => {
        try {

        } catch (err) {
            console.error(`Error while Store User`, err);

        }
    }
}

export default userController;