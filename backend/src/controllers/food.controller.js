const FoodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const path = require("path");

async function createFoodItem(req, res) {
    const foodPartner = req.foodPartner;

    console.log("food partner: ", foodPartner)
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);    

    // Extract file extension from original filename
    const fileExtension = path.extname(req.file.originalname);
    const fileName = uuid() + fileExtension;

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, fileName);

    console.log(fileUploadResult);

    const foodItem = await FoodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(200).json({
        message: "food item created successfully",
        food: foodItem
    })
}

async function getFoodItems(req, res) {
    const foodItems = await FoodModel.find({

    });

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
}

module.exports = {
    createFoodItem,
    getFoodItems,
}