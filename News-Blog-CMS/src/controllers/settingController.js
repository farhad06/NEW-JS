const settingController = {
    settings: async (req, res) => {
        res.render('admin/settings', { role: req.role });

    },
    saveSettings: async (req, res) => {

    }

}


module.exports = settingController;