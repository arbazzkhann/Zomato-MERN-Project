const FoodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware (req, res, next) {
    const token = req.cookies.token;
    console.log("cookies", req.cookies)

    //checking user having token or not
    if(!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        //checking token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Food-Partner
        const foodPartner = await FoodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
}