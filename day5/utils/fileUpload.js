const path = require('path');
const fs = require('fs');


function uploadFile(req, fieldName, prefix = '', folder = '') {

    if (!req.file) return null;

    const uploadDir = path.join(__dirname, `../public/uploads/${folder}`);

    // create folder if not exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(req.file.originalname);

    // custom name like Laravel
    const fileName = `${prefix}${Date.now()}${ext}`;

    const newPath = path.join(uploadDir, fileName);

    // move file from temp (multer) to new path
    fs.renameSync(req.file.path, newPath);

    return `/uploads/${folder}/${fileName}`;
}

module.exports = uploadFile;