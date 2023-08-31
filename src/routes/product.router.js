const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/product.controller');

productRouter.get('/productdata/:productId',productController.getProductDetailById);
productRouter.get('/tradedata/:productId',productController.getTradeProductById);

module.exports = { productRouter };