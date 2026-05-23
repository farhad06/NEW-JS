const multer = require('multer');
const path = require('path');


const destinationFolder = path.join(__dirname, '../../public/upload');

const storage = multer.diskStorage({

    destination: function (req, res, cb) {
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const filterFile = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG ,JPEG ,PNG files are allowed'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filterFile
});



module.exports = upload;