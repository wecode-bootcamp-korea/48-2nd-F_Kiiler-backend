const productService = require('../services/product.service')
const { catchAsync } = require('../utils/error')


const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.query

  const result = await productService.getProductById(productId);
  res.status(200).json({ data: result });
});


const getTradeProductById = catchAsync(async (req, res) => {

  const id  = req.params.id
  
      const tradeData = await productService.getTradeProductById(id);
      
      res.status(200).json({ data: tradeData })
});

module.exports = { getProductById, getTradeProductById };