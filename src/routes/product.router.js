const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/product.controller");

productRouter.get("/productdata", productController.getProductById);
productRouter.get("/tradedata", productController.getTradeProductById)

module.exports = { productRouter };




