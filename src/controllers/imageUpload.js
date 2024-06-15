const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true); 
    } else {
        cb(new Error('Only JPEG/JPG and PNG images are allowed.'), false);
    }
};

const upload = multer({ storage, fileFilter }).single('image'); 

module.exports = upload;