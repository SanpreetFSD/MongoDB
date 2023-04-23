const express = require("express");
const userRouter = express.Router();
const { registerController,
        userController
} =require("../controllers/UserController")

userRouter.post ("/register", controller_function);

userRouter.post ("/user", controller_function);

module.exports = userRouter