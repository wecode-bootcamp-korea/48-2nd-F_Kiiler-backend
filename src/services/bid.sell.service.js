const bidSellDao = require('../models/bid.sell.dao');
const { bidStatusEnum } = require('../models/enums');
const uuid = require('uuid');

const searchBidProductSize = async (productId, size) => {
  const [getSizeId] = await bidSellDao.getSizeId(size);
  const sizeId = getSizeId.id;
  const [bidProductSizeId] = await bidSellDao.searchBidProductSize(
    productId,
    sizeId
  );
  return bidProductSizeId.id;
};

const existingBidBuy = async (status, bidProductSizeId, price) => {
  const bidBuyinfo = await bidSellDao.existingBidBuyInfo(
    status,
    bidProductSizeId,
    price
  );
  return bidBuyinfo;
};

const existingBidSell = async (sellerId, status, bidProductSizeId, price) => {
  const bidSellInfo = await bidSellDao.existingBidSellInfo(
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
  let bidSellId;
  if (existingBidBuyInfo) {
    const bidBuyId = existingBidBuyInfo.id;
    const modifyAndInsertBidSell = await bidSellDao.modifyAndInsertBidSell(
      bidBuyId,
      sellerId,
      bidProductSizeId,
      status,
      price
    );
    bidSellId = modifyAndInsertBidSell;
  } else if (!existingBidBuyInfo) {
    const insertOnlyBidSell = await bidSellDao.insertOnlyBidSell(
      sellerId,
      bidProductSizeId,
      status,
      price
    );
    bidSellId = insertOnlyBidSell.insertId;
  }
  return bidSellId;
};

const getBidSell = async (bidSellId) => {
  const getBidSell = await bidSellDao.getBidSell(bidSellId);
  return getBidSell;
};

const insertBidSellOrOrder = async (
  sellerId,
  productId,
  size,
  price,
  orderPrice,
  point
) => {
  let status = bidStatusEnum.WAIT_CONFIRMED;
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const existingBidBuyInfo = await existingBidBuy(
    status,
    bidProductSizeId,
    price
  );
  const existingBidSellInfo = await existingBidSell(
    sellerId,
    status,
    bidProductSizeId,
    price
  );

  let bidBuyId;
  let bidBuyerId;
  let bidSellId = existingBidSellInfo;
  status = bidStatusEnum.ORDER_CONFIRMED;

  if (existingBidBuyInfo) {
    bidBuyId = existingBidBuyInfo.id;
    bidBuyerId = existingBidBuyInfo.buyer_id;
    const shortUuid = uuid.v4().substr(0, 8);
    bidSellId = existingBidSellInfo.id;
    const insertOrder = await bidSellDao.insertOrder(
      status,
      bidBuyId,
      bidSellId,
      point,
      sellerId,
      bidBuyerId,
      bidProductSizeId,
      shortUuid,
      orderPrice
    );
    const getOrderInfo = await bidSellDao.searchOrder(insertOrder);
    return getOrderInfo;
  } else if (!existingBidBuyInfo) {
    const status = bidStatusEnum.SELL_CONFIRMED;
    bidSellId = existingBidSellInfo.id;
    const modifyBidSell = bidSellDao.modifyBidSell(
      status,
      bidSellId,
      point,
      sellerId
    );

    const getBidSell = await bidSellDao.getBidSell(bidSellId);
    return getBidSell;
  }
};

module.exports = {
  insertBidSellWaiting,
  insertBidSellOrOrder,
  getBidSell,
};
