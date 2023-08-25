const express = require("express");

const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);

module.exports = { userRouter };
