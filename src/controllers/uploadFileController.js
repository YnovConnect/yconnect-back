import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/profiles/')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = req.currentUserId + extension;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


const uploadImage = multer({
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        const extension = path.extname(file.originalname).toLowerCase();

        if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(extension)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
        }
    }, storage: storage
});

const uploadImageProfile = async (req, res) => {
    try {

        return res.status(200).send({filename: req?.file?.filename});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const uploadBackgroundProfile = async (req, res) => {
    try {
        return res.status(200).send({filename: req?.file?.filename});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
export default {
    uploadImageProfile,
    uploadBackgroundProfile,
}
