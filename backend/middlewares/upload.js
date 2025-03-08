const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../database/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "menu_images", 
        format: async (req, file) => "png", 
        public_id: (req, file) => file.originalname.split(".")[0]
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
