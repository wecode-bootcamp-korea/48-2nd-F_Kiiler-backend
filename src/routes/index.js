const express = require("express");
const routes = express.Router();

const { userRouter } = require("./user.router");
const { productRouter } = require("./product.router");

routes.use("/user", userRouter);
routes.use("/product", productRouter);

module.exports = { routes };
