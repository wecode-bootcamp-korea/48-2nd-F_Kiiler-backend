const productService = require('../services/product.service')
const { catchAsync } = require('../utils/error')


const getProductById = catchAsync(async (req, res) => {
  const { productId } = await req.query
 
  const result = await productService.getProductById(productId);
  res.status(200).json(result); 
});


const getTradeProductById = catchAsync(async (req, res) => {
  const { } = await req.query

      const tradeData = await productService.getTradeProductById();
      res.status(200).json(tradeData)
    });


module.exports = { getProductById, getTradeProductById };






