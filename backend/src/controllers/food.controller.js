const FoodModel = require("../models/food.model");
const LikeModel = require("../models/likes.model");
const BookmarkModel = require("../models/bookmark.model");

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

async function likeFoodItems(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    //If already liked
    const isAlreadyLiked = await LikeModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadyLiked) {
        await LikeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await FoodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            message: "Food unliked successfully"
        });
    }

    //If not liked
    const like = await LikeModel.create({
        user: user._id,
        food: foodId
    });

    await FoodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    res.status(200).json({
        message: "Like added successfully",
        like
    });
}

async function bookmarkFoodItems(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await BookmarkModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadySaved) {
        await BookmarkModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await FoodModel.findByIdAndUpdate(foodId, {
            $inc: { bookmarkCount: -1 }
        });

        return res.status(200).json({
            message: "Food removed from bookmark successfully"
        });
    }

    const bookmark = await BookmarkModel.create({
        user: user._id,
        food: foodId
    });

    await FoodModel.findByIdAndUpdate(foodId, {
        $inc: { bookmarkCount: 1 }
    });

    res.status(201).json({
        message: "Food bookmarked successfully",
        bookmark
    });
}

module.exports = {
    createFoodItem,
    getFoodItems,
    likeFoodItems,
    bookmarkFoodItems,
}