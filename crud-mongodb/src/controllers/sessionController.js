const sessionController = {
    login: (req, res) => {
        const { username, password } = req.body;

        if (username === 'farhad' && password === '1234') {
            req.session.user = {
                id: 1,
                name: "Farhad Ahamed",
                role: "Admin"
            }

            res.status(200).json({ message: 'Login Successfully', user: req.session.user });
        }

        res.status(401).json({ message: 'Invalid Credentials' });
    },

    dashboard: (req, res) => {

        if (!req.session.user) {
            res.status(401).json({ message: "Not Logged In" });
        }

        res.status(200).json(`Welcome ${req.session.user.name}`);

    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: 'Logout Filed' });
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout Successfully' });
        })
    }
}



export default sessionController;