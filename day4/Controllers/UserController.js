
const users = [
    { id: 1, name: 'Rohit', email: 'rohit@example.com' },
    { id: 2, name: 'Virat', email: 'virat@example.com' },
    { id: 3, name: 'Farhad', email: 'farhad@example.com' },
];

const UserController = {
    home: (req, res) => {
        res.render('home', { title: 'Home' });
    },

    about: (req, res) => {
        res.render('about', { title: 'About Us' })
    },

    index: (req, res) => {
        res.render('users/index', { title: 'All Users', users });
    },

    showUser: (req, res) => {
        const user = users.find(u => u.id == req.params.id);

        if (!user) return res.status(404).render('404', { title: 'User Not Found' })

        res.render('users/show', { title: user.name, user })
    },

    greet: (req, res) => {
        res.send(`<h3>Hello ${req.query.name}</h3>`)
    }
}

module.exports = UserController;