const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: String,
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartnerModel"
    }
}, {timestamps: true});

module.exports = mongoose.model("FoodModel", foodSchema);