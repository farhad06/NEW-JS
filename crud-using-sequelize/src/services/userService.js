import User from "../models/userModel.js";

const userService = {

    getAllUser: async () => {
        return await User.findAll({ attributes: { exclude: ['password'] } });
    },
    createUser: async (data) => {
        return await User.create(data);
    },
    updateUser: async (id, data) => {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }

        await user.update(data);
        return user;
    },
    userFindById: async (id) => {
        return await User.findByPk(id, { attributes: { exclude: ['password'] } });
    },
    deleteUser: async (id) => {
        const user = await User.findByPk(id);

        if (!user) {
            return null;
        }

        user.destroy();
        return user;
    }
}

export default userService;