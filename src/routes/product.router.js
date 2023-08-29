const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/product.controller");

productRouter.get("/:productId", productController.getProductDetail);

module.exports = { productRouter };
