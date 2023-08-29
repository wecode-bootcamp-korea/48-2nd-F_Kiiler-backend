const bidService = require('../services/bid.service');
const { catchAsync } = require('../utils/error');

const insertBidSellOrOrder = catchAsync(async (req, res) => {
  const { sellerId, productId, size, price } = req.body;
  const bidSellOrOrder = await bidService.insertBidSellOrOrder(
    sellerId,
    productId,
    size,
    price
  );

  res.status(201).json({ data: bidSellOrOrder });
});

const insertBidBuyOrOrder = catchAsync(async (req, res) => {
  const { buyerId, productId, size, price } = req.body;
  const bidBuyOrOrder = await bidService.insertBidBuyOrOrder(
    buyerId,
    productId,
    size,
    price
  );

  res.status(201).json({ data: bidBuyOrOrder });
});

module.exports = { insertBidSellOrOrder, insertBidBuyOrOrder };
