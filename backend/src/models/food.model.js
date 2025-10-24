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
    foodParter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartnerModel"
    }
});

module.exports = mongoose.model("FoodModel", foodSchema);