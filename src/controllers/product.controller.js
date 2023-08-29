const productService = require('../services/product.service')
const { catchAsync } = require('../utils/error')


const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await productService.getProductById(id);
  res.status(200).json({ data: result });
});


const getTradeProductById = catchAsync(async (req, res) => {
  const id  = req.params.id
  
      const tradeData = await productService.getTradeProductById(id);
      
      res.status(200).json({ data: tradeData })
});


module.exports = { getProductById, getTradeProductById };