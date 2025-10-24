const mongoose = require("mongoose");

const footParternerSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model("FoodPartnerModel", footParternerSchema);