const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.registerUser = registerUser;
exports.loginUser = loginUser;