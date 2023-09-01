const bidBuyDao = require('../models/bid.buy.dao');
const { bidStatusEnum } = require('../models/enums');
const uuid = require('uuid');

const searchBidProductSize = async (productId, size) => {
  const [getSizeId] = await bidBuyDao.getSizeId(size);
  const sizeId = getSizeId.id;
  const [bidProductSizeId] = await bidBuyDao.searchBidProductSize(
    productId,
    sizeId
  );
  return bidProductSizeId.id;
};

const existingBidSell = async (status, bidProductSizeId, price) => {
  const bidSellInfo = await bidBuyDao.existingBidSellInfo(
    status,
    bidProductSizeId,
    price
  );
  return bidSellInfo;
};

const existingBidBuy = async (buyerId, status, bidProductSizeId, price) => {
  const bidBuyInfo = await bidBuyDao.existingBidBuyInfo(
    buyerId,
    status,
    bidProductSizeId,
    price
  );
  return bidBuyInfo;
};

const insertBidBuyWaiting = async (buyerId, productId, size, price) => {
  let status = bidStatusEnum.SELL_CONFIRMED;
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const existingBidSellInfo = await existingBidSell(
    status,
    bidProductSizeId,
    price
  );
  status = bidStatusEnum.WAIT_CONFIRMED;

  let bidBuyId;
  if (existingBidSellInfo) {
    const bidSellId = existingBidSellInfo.id;
    const modifyAndInsertBidSell = await bidBuyDao.modifyAndInsertBidBuy(
      bidSellId,
      buyerId,
      bidProductSizeId,
      status,
      price
    );
    bidBuyId = modifyAndInsertBidSell;
  } else if (!existingBidSellInfo) {
    const insertOnlyBidBuy = await bidBuyDao.insertOnlyBidBuy(
      buyerId,
      bidProductSizeId,
      status,
      price
    );
    bidBuyId = insertOnlyBidBuy;
  }
  return bidBuyId;
};

const getBidBuy = async (bidBuyId) => {
  const getBidBuy = await bidBuyDao.getBidBuy(bidBuyId);
  return getBidBuy;
};

const insertBidBuyOrOrder = async (
  buyerId,
  productId,
  size,
  price,
  orderPrice,
  point
) => {
  let status = bidStatusEnum.WAIT_CONFIRMED;
  const bidProductSizeId = await searchBidProductSize(productId, size);
  const existingBidSellInfo = await existingBidSell(
    status,
    bidProductSizeId,
    price
  );
  const existingBidBuyInfo = await existingBidBuy(
    buyerId,
    status,
    bidProductSizeId,
    price
  );
  let bidSellId;
  let bidSellerId;
  let bidBuyId = existingBidSellInfo;
  status = bidStatusEnum.ORDER_CONFIRMED;

  if (existingBidSellInfo) {
    bidSellId = existingBidSellInfo.id;
    bidSellerId = existingBidSellInfo.seller_id;
    const shortUuid = uuid.v4().substr(0, 8);
    bidBuyId = existingBidBuyInfo.id;
    const insertOrder = await bidBuyDao.insertOrder(
      status,
      bidSellId,
      bidBuyId,
      point,
      buyerId,
      bidSellerId,
      bidProductSizeId,
      shortUuid,
      orderPrice
    );
    const getOrderInfo = await bidBuyDao.searchOrder(insertOrder);
    return getOrderInfo;
  } else if (!existingBidSellInfo) {
    const status = bidStatusEnum.SELL_CONFIRMED;
    bidBuyId = existingBidBuyInfo.id;
    const modifyBidBuy = bidBuyDao.modifyBidBuy(
      status,
      bidBuyId,
      point,
      buyerId
    );

    const getBidBuy = await bidBuyDao.getBidBuy(bidBuyId);
    return getBidBuy;
  }
};

module.exports = {
  insertBidBuyWaiting,
  insertBidBuyOrOrder,
  getBidBuy,
};
