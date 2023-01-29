const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        const pathStorage = `${__dirname}/../storageFiles`
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop() //TODO: OBTENER LA EXTENSION DEL ARCHIVO SUBIDO
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename)
    }
})

const uploadMiddleware = multer({ storage }); //storage:storage

module.exports = uploadMiddleware