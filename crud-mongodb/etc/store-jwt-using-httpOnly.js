
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,          // JS cannot access
            secure: false,         // true in production (HTTPS)
            sameSite: 'lax',        // CSRF protection
            maxAge: 1000 * 60 * 60 // 1 hour
        });

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Logout — clear cookie from server
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out' });
};