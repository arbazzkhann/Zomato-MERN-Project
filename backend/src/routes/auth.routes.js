const express = require("express");
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    registerFoodParter,
    loginFoodPartner,
    logoutFoodPartner,
} = require("../controllers/auth.controller");

const router = express.Router();

//User
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/logout', logoutUser);

//Food-Parter
router.post('/food-partner/register', registerFoodParter);
router.post('/food-partner/login', loginFoodPartner);
router.get('/food-partner/logout', logoutFoodPartner);

module.exports = router;