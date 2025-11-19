const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodModel",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("LikesModel", likesSchema);