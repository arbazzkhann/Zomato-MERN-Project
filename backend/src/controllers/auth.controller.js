const UserModel = require("../models/user.model");
const FoodPartnerModel = require("../models/foodPartner.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user-register
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await UserModel.findOne({
        email
    });

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    //creating user
    const user = await UserModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    //jsonWebToken
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);  //saving into cookie
    
    //final response
    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

//user-login
async function loginUser(req, res) {
    const {email, password } = req.body;

    //checking user is valid
    const user = await UserModel.findOne({
        email
    });
    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    //checking password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    //token
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    //saving token in cookie
    res.cookie("token", token);

    //user sign-in successfully
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

//user-logout
function logoutUser(req, res) {
    if(!req.cookies.token) {
        return res.status(400).json({
            message: "User not logged in yet!"
        })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully!"
    });
}

//foodParter-register
async function registerFoodParter(req, res) {
    const { fullName, email, password } = req.body;

    const isFoodParterExists = await FoodPartnerModel.findOne({
        email
    });

    if(isFoodParterExists) {
        return res.status(400).json({
            message: "Food parter already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const foodParter = await FoodPartnerModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: foodParter._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "Foot parter created successfully",
        foodParter: {
            id: foodParter._id,
            email: foodParter.email,
            fullName: foodParter.fullName
        }
    });
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodParter = await FoodPartnerModel.findOne({
        email
    });

    if(!foodParter) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, foodParter.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: foodParter._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            id: foodParter._id,
            email: foodParter.email,
            fullName: foodParter.fullName
        }
    })
}

function logoutFoodPartner(req, res) {
    if(!req.cookies.token) {
        return res.status(400).json({
            message: "User not logged in yet!"
        })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully!"
    });
}

//user
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;

//food-partner
exports.registerFoodParter = registerFoodParter;
exports.loginFoodPartner = loginFoodPartner;
exports.logoutFoodPartner = logoutFoodPartner;