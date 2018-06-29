const express = require('express');
let router = express.Router();

const ho=require('./base/httpOutput');
const Login=require("./base/Login");
const User=require('./component/user');
const signUp=require('./component/teamsign');

router.post("/login",Login);

router.use("/user",User);
router.use("/sign_up",signUp);

module.exports=router;