const productDao = require("../models/product.dao");

const getProductDetail = async (productId) => {
    return await productDao.getProductById(productId);
  };

const getProductDetailById = async (id) => {
    return await productDao.getProductDetailById(id);
};

const getTradeProductById = async (id) => {
    const tradeAllOfProduct = await productDao.getTradeProductById(id);

    return {
        tradeAllOfProduct: tradeAllOfProduct[0],
        tradeLimit: tradeAllOfProduct[1]
    }
}

module.exports = { getProductDetail, getProductDetailById, getTradeProductById };