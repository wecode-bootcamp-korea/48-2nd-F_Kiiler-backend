const productService = require("../services/product.service");
const { catchAsync } = require("../utils/error");

const getProductDetailById = catchAsync(async (req, res) => {
  const productId = req.params.productId
  const result = await productService.getProductDetailById(productId);

  res.status(200).json({ data: result });
});

const getTradeProductById = catchAsync(async (req, res) => {
  const productId  = req.params.productId
  const tradeData = await productService.getTradeProductById(productId);
  
  res.status(200).json({ data: tradeData })
});

module.exports = { getProductDetailById, getTradeProductById };