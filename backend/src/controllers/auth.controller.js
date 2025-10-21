const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await UserModel.findOne({
        email
    });

    if(isUserAlreadyExists) {
        console.log("User already exists!");
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
    }, "81300e41de5ed065ffce3f1abae380be8ebe307b");

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

async function loginUser(req, res) {

}

exports.registerUser = registerUser;
exports.loginUser = loginUser;