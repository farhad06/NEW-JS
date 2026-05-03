
import User from "../models/user.js";

const userContoller = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: `Error while fetching users`, error: err.message });
        }
    },
    createUser: async (req, res) => {
        try {

            await User.create(req.body);
            res.status(201).json({ message: `User created successfully` });
        } catch (err) {
            res.status(500).json({ message: `Error while creating user`, error: err.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!user) {
                return res.status(404).json({ message: `User not found` });
            }

            res.status(201).json({ message: `User updated successfully` });
        } catch (err) {
            res.status(500).json({ message: `Error while updating user`, error: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({ message: `User not found` });
            }

            res.status(201).json({ message: `User deleted successfully` });
        } catch (err) {
            res.status(500).json({ message: `Error while deleted user`, error: err.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: `User not found` });
            }

            res.status(201).json({ message: `User show successfully`, user: user });
        } catch (err) {
            res.status(500).json({ message: `Error while show user`, error: err.message });
        }
    }
}


export default userContoller;