const Setting = require('../models/Setting.js');
const logger = require('../utils/logger.js');
const path = require('path');
const fs = require('fs');

const settingController = {
    settings: async (req, res) => {
        const settings = await Setting.findOne();
        
        res.render('admin/settings', { role: req.role, settings });

    },
    saveSettings: async (req, res) => {
        try {
            const { website_title, footer_description } = req.body;
            const website_logo = req.file?.filename;

            let setting = await Setting.findOne();

            if (!setting) {
                setting = new Setting();
            }
            setting.website_title = website_title;
            setting.footer_description = footer_description;

            if (website_logo) {
                if (setting.website_logo) {
                    const logoPath = path.join(__dirname, '../../public/upload', setting.website_logo);

                    if (fs.existsSync(logoPath)) {
                        fs.unlinkSync(logoPath);
                    }
                }
                setting.website_logo = website_logo;
            }

            await setting.save();
            req.flash('success', 'Settings Saved Successfully')
            res.redirect('/admin/settings');
        } catch (err) {
            logger.error(err.message);
            req.flash('error', 'Something Went Wrong')
            return res.redirect('/admin/settings');
        }
    }

}


module.exports = settingController;