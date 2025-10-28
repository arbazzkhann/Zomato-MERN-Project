const FoodModel = require("../models/food.model");

async function createFood(req, res) {
    const foodPartner = req.foodPartner;

    console.log("food partner: ", foodPartner)

    console.log("req.body: ", req.body);

    console.log("req.file: ", req.file);
}

module.exports = {
    createFood,
}