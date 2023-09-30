const express = require("express");
const { signup ,signin } = require("../controller/userController.js");
const userRouter = express.Router();

userRouter.post("/signUp", signup);

userRouter.post("/logIn", signin)

module.exports = userRouter;