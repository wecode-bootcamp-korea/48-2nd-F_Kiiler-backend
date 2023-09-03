const productDao = require('../models/product.dao');

const getProductDetailById = async (productId) => {
  const result = await productDao.getProductDetailById(productId);
  const recent = await productDao.getRecentTradeDataById(productId);
  const buyPrice = await productDao.getBuyPrice(productId);
  const sellPrice = await productDao.getSellPrice(productId);
  const tradeAllOfProduct = await productDao.getTradeProductById(productId);
  const allSizePrice = await productDao.getRecentPrice(productId);
  console.log(allSizePrice);
  const recentNowPrice = recent.totalOrderPrice;
  // console.log(recentNowPrice);
  const recentPrice = 150000;
  // const recentBuyPrice = buyPrice.price;
  const recentBuyPrice = 120000;
  // const recentSellPrice = sellPrice.price;
  const recentSellPrice = 150000;

  result[0]['recentTrade'] = recentPrice;
  result[0]['buyPrice'] = recentBuyPrice;
  result[0]['sellPrice'] = recentSellPrice;
  result.push({ trade: tradeAllOfProduct });
  result[1]['sizePrice'] = allSizePrice;

  return result;
};

module.exports = { getProductDetailById };
