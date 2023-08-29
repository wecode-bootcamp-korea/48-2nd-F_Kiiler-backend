const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/product.controller");

productRouter.get("/productdata/:id", productController.getProductById);
productRouter.get("/tradedata/:id", productController.getTradeProductById)

module.exports = { productRouter };