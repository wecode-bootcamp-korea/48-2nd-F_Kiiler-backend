const productDao = require("../models/product.dao");

const getProductDetailById = async (productId) => {
    const result = await productDao.getProductDetailById(productId);
    const recent = await productDao.getRecentTradeDataById(productId);
    const buyPrice = await productDao.getBuyPrice(productId);
    const sellPrice = await productDao.getSellPrice(productId);
    const tradeAllOfProduct = await productDao.getTradeProductById(productId);
   
    const recentPrice = recent.totalOrderPrice
    const recentBuyPrice = buyPrice.price
    const recentSellPrice = sellPrice.price

    result[0]['recentTrade'] = recentPrice
    result[0]['buyPrice'] = recentBuyPrice
    result[0]['sellPrice'] = recentSellPrice
    result.push({'trade':tradeAllOfProduct}) 
    
    return result
};


module.exports = { getProductDetailById};