const bidDao = require('../models/bid.dao');
const { bidStatusEnum } = require('../models/enums');
const uuid = require('uuid');

const searchBidProductSize = async (productId, size) => {
  const [getSizeId] = await bidDao.getSizeId(size);
  const sizeId = getSizeId.id;
  const [bidProductSizeId] = await bidDao.searchBidProductSize(
    productId,
    sizeId
  );
  return bidProductSizeId.id;
};

const existingBidBuy = async (status, bidProductSizeId, price) => {
  const bidBuyinfo = await bidDao.existingBidBuyInfo(
    status,
    bidProductSizeId,
    price
  );
  return bidBuyinfo;
};

const existingBidSell = async (sellerId, status, bidProductSizeId, price) => {
  const bidSellInfo = await bidDao.existingBidSellInfo(
    sellerId,
    status,
    bidProductSizeId,
    price
  );
  return bidSellInfo;
};

const insertBidSellWaiting = async (sellerId, productId, size, price) => {
  let status = bidStatusEnum.BUY_CONFIRMED;
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const existingBidBuyInfo = await existingBidBuy(
    status,
    bidProductSizeId,
    price
  );
  status = bidStatusEnum.WAIT_CONFIRMED;
  if (existingBidBuyInfo) {
    const bidBuyId = existingBidBuyInfo.id;
    const modifyStatusBidBuy = await bidDao.modifyStatusBidBuy(
      status,
      bidBuyId
    );
  }

  const insertBidSell = await bidDao.insertBidSell(
    sellerId,
    bidProductSizeId,
    status,
    price
  );
  const bidSellId = insertBidSell.insertId;
  const getBidSell = await bidDao.getBidSell(bidSellId);
  return getBidSell;
};

const insertBidSellOrOrder = async (sellerId, productId, size, price) => {
  let status = bidStatusEnum.WAIT_CONFIRMED;
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const existingBidBuyInfo = await existingBidBuy(
    status,
    bidProductSizeId,
    price
  );
  console.log(existingBidBuyInfo);
  let bidBuyId;
  let bidBuyerId;

  const existingBidSellInfo = await existingBidSell(
    sellerId,
    status,
    bidProductSizeId,
    price
  );
  const bidSellId = existingBidSellInfo.id;

  status = bidStatusEnum.ORDER_CONFIRMED;

  if (existingBidBuyInfo) {
    bidBuyId = existingBidBuyInfo.id;
    bidBuyerId = existingBidBuyInfo.buyer_id;
    const shortUuid = uuid.v4().substr(0, 8);
    const modifyStatusBidBuy = await bidDao.modifyStatusBidBuy(
      status,
      bidBuyId
    );

    const modifyStatusBidSell = await bidDao.modifyStatusBidSell(
      status,
      bidSellId
    );

    const insertOrder = await bidDao.insertOrder(
      sellerId,
      bidBuyerId,
      bidProductSizeId,
      shortUuid,
      price
    );
    const orderId = insertOrder.insertId;
    const getOrderInfo = await bidDao.searchOrder(orderId);
    return getOrderInfo;
  } else if (!existingBidBuyInfo) {
    const status = bidStatusEnum.SELL_CONFIRMED;
    const modifyStatusBidSell = await bidDao.modifyStatusBidSell(
      status,
      bidSellId
    );
    const getBidSell = await bidDao.getBidSell(bidSellId);
    return getBidSell;
  }
};

module.exports = {
  existingBidSell,
  existingBidBuy,
  searchBidProductSize,
  insertBidSellWaiting,
  insertBidSellOrOrder,
};
