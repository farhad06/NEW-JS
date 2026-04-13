const userController = {
    insert: (req, res) => {
        const { firstName, lastName, email } = req.body;

        res.status(200).json({ "msg": "Data Successfully Inserted" });
    }
}


module.exports = userController;