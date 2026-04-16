const { User } = require('../models/userModal');
const userController = {
    insert: async (req, res) => {
        try {
            /*const data = User.build({ name: 'Farhad' })
            await data.save();*/

            //const data = await User.create({ name: 'Virat', favorite_color: 'red', 'age': 38 })

            const data = await User.create();
            data.set({
                'name': 'Rahul',
                'favorite_color': 'Gray',
                'age': 32
            })

            await data.save();

            await data.increment({ age: 5, cash: 1000 });
            //await data.increment(['age', 'cash'], { by: 2 })
            res.send('Data Saved');
        } catch (err) {
            console.error('Data Save Error', err);
        }
    }
}


module.exports = userController;