const express = require("express");
const { registerUser, loginUser }= require("../controllers/auth.controller");

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/register', loginUser);

module.exports = router;