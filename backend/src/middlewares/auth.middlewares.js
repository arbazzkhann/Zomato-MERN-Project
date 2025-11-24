const FoodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
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

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(200).json({
            message: "Please login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded);

        // Try normal User
        let user = await UserModel.findById(decoded.id);

        if (user) {
            console.log("Logged in as user.");
            req.user = user;
            req.userType = 'user';
            next(); // RETURN so we only call next() once
        }

        // try Food Partner
        const foodPartner = await FoodPartnerModel.findById(decoded.id);
        console.log("foodPartner: ", foodPartner);

        if (foodPartner) {
            console.log("Logged in as food partner.");
            req.user = foodPartner;
            next();
        }
        
        // Neither found
        return res.status(401).json({ 
            message: "Invalid token: user not found",
            token,
            decoded
        });
    }
    catch(err) {
        res.status(401).json({
            message: "Invalid or expired token",
            err,
        });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
}