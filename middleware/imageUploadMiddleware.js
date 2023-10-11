const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
    url : mongoURI,
    file : (req, file) => {
        return {
            filename : file.orignalname,
            bucketName : 'productImages'
        };
    }
});

const upload = multer({ storage });

module.exports = upload;