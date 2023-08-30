const productService = require('../services/product.service')
const { catchAsync } = require('../utils/error')


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


module.exports = { getProductDetailById, getTradeProductById };