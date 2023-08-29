const bidDao = require('../models/bid.dao');

const searchBidProductSize = async (productId, size) => {
  const sizeId = await bidDao.getSizeId(size);
  const getSizeId = sizeId[0].id;
  const bidProductSizeId = await bidDao.searchBidProductSize(
    productId,
    getSizeId
  );
  return bidProductSizeId[0].id;
};

const searchBidBuyInfo = async (bidProductSizeId, price) => {
  const bidBuyinfo = await bidDao.searchBidBuyInfo(bidProductSizeId, price);
  return bidBuyinfo;
};

const searchBidSellInfo = async (bidProductSizeId, price) => {
  const bidSellInfo = await bidDao.searchBidSellInfo(bidProductSizeId, price);
  return bidSellInfo;
};

const insertBidSellOrOrder = async (sellerId, productId, size, price) => {
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const bidBuyinfo = await searchBidBuyInfo(bidProductSizeId, price);
  const randomNumber = async () => {
    const year = new Date().getFullYear();
    const stringYear = String(year);
    const randomNumber = Math.floor(Math.random() * 10000);
    const orderNumber = stringYear + randomNumber;
    return orderNumber;
  };
  const orderNumber = await randomNumber();
  let bidOrOrderInfo;

  if (!bidBuyinfo) {
    const status = '판매입찰';
    const insertBidSell = await bidDao.insertBidSell(
      sellerId,
      bidProductSizeId,
      status,
      price
    );
    const bidSellId = insertBidSell.insertId;
    const getBidSell = await bidDao.getBidSell(sellerId, bidSellId);
    return (bidOrOrderInfo = getBidSell);
  } else if (bidBuyinfo.id >= 1) {
    const bidBuyId = bidBuyinfo.id;
    const bidBuyerId = bidBuyinfo.buyer_id;
    const status = '입찰완료';
    const insertBidSell = await bidDao.insertBidSell(
      sellerId,
      bidProductSizeId,
      status,
      price
    );
    const modifyStatusBidBuy = await bidDao.modifyStatusBidBuy(bidBuyId);
    const insertOrder = await bidDao.insertOrder(
      sellerId,
      bidBuyerId,
      bidProductSizeId,
      orderNumber,
      price
    );
    const orderId = insertOrder.insertId;
    const getOrderInfo = await bidDao.searchOrder(orderId);
    return (bidOrOrderInfo = getOrderInfo);
  }
};

const insertBidBuyOrOrder = async (buyerId, productId, size, price) => {
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const bidSellInfo = await searchBidSellInfo(bidProductSizeId, price);
  console.log(bidSellInfo);
  const randomNumber = async () => {
    const year = new Date().getFullYear();
    const stringYear = String(year);
    const randomNumber = Math.floor(Math.random() * 10000);
    const orderNumber = stringYear + randomNumber;
    return orderNumber;
  };
  const orderNumber = await randomNumber();
  let bidOrOrderInfo;

  if (!bidSellInfo) {
    const status = '구매입찰';
    const insertBidBuy = await bidDao.insertBidBuy(
      buyerId,
      bidProductSizeId,
      status,
      price
    );
    const bidBuyId = insertBidBuy.insertId;
    const getBidBuy = await bidDao.getBidBuy(buyerId, bidBuyId);
    return (bidOrOrderInfo = getBidBuy);
  } else if (bidSellInfo.id >= 1) {
    const bidSellId = bidSellInfo.id;
    const bidSellerId = bidSellInfo.seller_id;
    const status = '입찰완료';
    const insertBidBuy = await bidDao.insertBidBuy(
      buyerId,
      bidProductSizeId,
      status,
      price
    );
    const modifyStatusBidSell = await bidDao.modifyStatusBidSell(bidSellId);
    const insertOrder = await bidDao.insertOrder(
      bidSellerId,
      buyerId,
      bidProductSizeId,
      orderNumber,
      price
    );
    const orderId = insertOrder.insertId;
    const getOrderInfo = await bidDao.searchOrder(orderId);
    return (bidOrOrderInfo = getOrderInfo);
  }
};

module.exports = {
  searchBidSellInfo,
  searchBidBuyInfo,
  searchBidProductSize,
  insertBidSellOrOrder,
  insertBidBuyOrOrder,
};
