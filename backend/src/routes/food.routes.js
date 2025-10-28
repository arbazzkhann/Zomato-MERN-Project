const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

const { authFoodPartnerMiddleware } = require("../middlewares/auth.middlewares")

const { createFood,  } = require("../controllers/food.controller");



/* POST /api/food/ [protected] */
router.post("/", authFoodPartnerMiddleware, upload.single("video"),createFood)


module.exports = router;