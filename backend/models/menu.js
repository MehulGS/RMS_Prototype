const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
        required: true
    },
    foodname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL of the image stored in Cloudinary
        required: true
    }
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
