const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middlewares")

const foodController = require("../controllers/food.controller");



/* POST /api/food/ [protected] */
router.post("/", 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"),
    foodController.createFoodItem
);

router.get("/", 
    authMiddleware.authUserMiddleware, 
    upload.single("video"),
    foodController.getFoodItems
);

router.post('/like', 
    authMiddleware.authUserMiddleware,
    foodController.likeFoodItems
);

module.exports = router;