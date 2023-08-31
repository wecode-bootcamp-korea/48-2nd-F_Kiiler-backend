const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/product.controller');

productRouter.get('/productdata/:productId',productController.getProductDetailById);

module.exports = { productRouter };