const cookieController = {
    setCookie: (req, res) => {

        //Basic
        //res.cookie('username', 'Farhad Ahamed');

        res.cookie('username', 'Farhad', {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            domain: 'localhost'
        });

        res.json({ message: 'Cookie Set !' })

    },
    getCookie: (req, res) => {

        //read single cookie 
        const username = req.cookie.username;

        //read all cookie 
        const allCookie = req.cookies;

        res.json({ user: username, allCookie: allCookie });

    },
    deleteCookie: (req, res) => {
        res.clearCookie('username');

        // With path/domain if you set them
        res.clearCookie('username', { path: '/', domain: 'localhost' });

        res.json({ message: 'Cookie deleted!' });
    }
}

export default cookieController;