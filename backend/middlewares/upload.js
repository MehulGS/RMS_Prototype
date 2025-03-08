const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../database/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "menu_images", // Cloudinary folder name
        format: async (req, file) => "png", // Adjust format if needed
        public_id: (req, file) => file.originalname.split(".")[0]
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
