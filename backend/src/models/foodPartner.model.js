const mongoose = require("mongoose");

const footParternerSchema = mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    address: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("FoodPartnerModel", footParternerSchema);