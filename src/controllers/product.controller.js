const productService = require("../services/product.service");
const { catchAsync } = require("../utils/error");

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const product = await productService.getProductDetail(productId);

  res.status(200).json({ product: product });
});

module.exports = { getProductDetail };
