const productService = require("../services/product.service");
const { catchAsync } = require("../utils/error");

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getProductDetail(productId);

  res.status(200).json({ data: product });
});

const getProductDetailById = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await productService.getProductDetailById(id);

  res.status(200).json({ data: result });
});

const getTradeProductById = catchAsync(async (req, res) => {
  const id  = req.params.id
  const tradeData = await productService.getTradeProductById(id);
  
  res.status(200).json({ data: tradeData })
});

module.exports = { getProductDetail, getProductDetailById, getTradeProductById };