const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Sabji", "Roti", "Paratha", "Pizza", "Dosa", "Idli", "Desert", "Rice", "Dal", "Chinese", "Drinks", "Burger", "Pasta", "Soup"],
    },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;