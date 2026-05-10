import bcrypt from "bcryptjs";
import User from "../models/user.js";

const authController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ status: false, message: 'Email and Password is Required !' })
            }

            //select password manually because password select false in modal
            const user = await User.findOne({ email: email }).select('+password');

            if (!user) {
                return res.status(401).json({ status: false, message: "Invalid Credential" });
            }



            const isMatched = await bcrypt.compare(password, user.password);

            if (!isMatched) {
                return res.status(401).json({ status: false, message: "Invalid Credential" });
            }

            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email
            }

            return res.status(200).json({
                status: true,
                message: 'Logged in successfuly',
                user: req.session.user
            })

        } catch (err) {
            return res.status(500).json({ status: false, error: err.message })
            //next();
        }
    },
    showUser: async (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ status: false, message: 'Can not Show Your Details or Logged Out' });
        }

        return res.status(200).json({
            status: true,
            message: `Welcome ${req.session.user.name}`
        });
    },
    logout: async (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        });
    }
}

export default authController;