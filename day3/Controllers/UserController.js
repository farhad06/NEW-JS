const UserController = {
    welcome: (req, res) => {
        //res.send('Hello From MVC ARC');
        res.render('welcome', { title: 'Home' })
    }
    ,
    about: (req, res) => {
        res.render('about', { title: 'About Us' })
    }
}


module.exports = UserController;