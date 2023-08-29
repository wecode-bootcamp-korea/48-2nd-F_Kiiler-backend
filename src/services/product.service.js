const productDao = require("../models/product.dao");

const getProductDetail = async (productId) => {
  return await productDao.getProductById(productId);
};

module.exports = { getProductDetail };
