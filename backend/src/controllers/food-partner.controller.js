const FoodPartnerModel = require("../models/foodPartner.model");
const FoodModel = require("../models/food.model");

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await FoodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await FoodModel.find({
        foodPartner: foodPartnerId
    });

    if(!foodPartner) {
        return res.status(400).json({
            message: "Food partner not exists!"
        });
    }

    res.status(200).json({
        message: "Food partner found",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    });
}

module.exports = {
    getFoodPartnerById,
}