import userService from "../services/userService.js";

const userController = {
    getAllUser: async (req, res) => {
        try {

            const data = await userService.getAllUser();

            res.status(200).json(data);
        } catch (err) {
            console.error(`Error While User Fetching`, err);
            res.status(500).json({ message: `Error While User Fetching` });

        }
    },
    store: async (req, res) => {
        try {
            const { first_name, last_name, email, phone, age, password } = req.body;

            const userdata = {
                firstName: first_name,
                lastName: last_name,
                email,
                phone,
                age,
                password
            };

            const user = await userService.createUser(userdata)
            res.status(201).json({
                message: `User Created Successfully`,
                data: user
            });
        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: `Error While User Create`, error: err.message });

        }
    },
    update: async (req, res) => {
        try {
            const { first_name, last_name, email, phone, age, password } = req.body;

            const userdata = {
                firstName: first_name,
                lastName: last_name,
                email,
                phone,
                age,
                password
            };

            const updateUser = await userService.updateUser(req.params.id, userdata);

            if (!updateUser) {
                return res.status(404).json({ message: `User Not Found` });
            }

            res.status(200).json({
                message: `User Updated Successfully`,
                data: updateUser
            });

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: 'Error while User Update' });

        }
    },
    destroy: async (req, res) => {
        try {
            const deleteUser = await userService.deleteUser(req.params.id);

            if (!deleteUser) {
                return res.status(404).json({ message: `User Not Found` });
            }

            res.status(200).json({
                message: `User Deleted Successfully`,
                data: deleteUser
            });

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: 'Error while User Delete' });
        }
    },
    show: async (req, res) => {
        try {

            const user = await userService.userFindById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: `User Not Found` });
            }

            return res.status(200).json(user);

        } catch (err) {
            console.error(`Error while Store User`, err);
            res.status(500).json({ message: `Error While User Fetching`, error: err.message });

        }
    }
}

export default userController;