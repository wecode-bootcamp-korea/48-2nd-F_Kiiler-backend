const express = require("express");

const { userRouter } = require("./user.router");

const routes = express.Router();

routes.use("/user", userRouter);

module.exports = { routes };
