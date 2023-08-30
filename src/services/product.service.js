const productDao = require("../models/product.dao");

const getProductDetailById = async (productId) => {
    return await productDao.getProductDetailById(productId);
};

const getTradeProductById = async (productId) => {
    const tradeAllOfProduct = await productDao.getTradeProductById(productId);

    return {
        tradeAllOfProduct: tradeAllOfProduct[0],
        tradeLimit: tradeAllOfProduct[1]
    }
}

module.exports = { getProductDetailById, getTradeProductById };