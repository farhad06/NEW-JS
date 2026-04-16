const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Make Sure Upload Folder is Exist
const uploadDir = path.join(__dirname, '../public/uploads/images');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// ══════════════════════════════════════
// STORAGE — where and how to save file
// like Storage::put() in Laravel
// ══════════════════════════════════════

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        
        cb(null, fileName)
    },

})


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
})

module.exports = upload;



//If use utils/fileUpload.js

/*

const upload = multer({
dest: path.join(__dirname, '../temp') // temp folder
});

module.exports = upload;




*/