const bidSellService = require('../services/bid.sell.service');
const { catchAsync } = require('../utils/error');

const insertBidSellWaiting = catchAsync(async (req, res) => {
  const { sellerId, productId, size, price } = req.body;
  const bidSell = await bidSellService.insertBidSellWaiting(
    sellerId,
    productId,
    size,
    price
  );
  res.status(201).json({ data: bidSell });
});

const getBidSell = catchAsync(async (req, res) => {
  const { id } = req.params;
  const getBidSell = await bidSellService.getBidSell(id);
  res.status(201).json({ data: getBidSell });
});

const insertBidSellOrOrder = catchAsync(async (req, res) => {
  const { sellerId, productId, size, price, orderPrice, point } = req.body;
  const bidSellOrOrder = await bidSellService.insertBidSellOrOrder(
    sellerId,
    productId,
    size,
    price,
    orderPrice,
    point
  );
  res.status(201).json({ data: bidSellOrOrder });
});

module.exports = { insertBidSellWaiting, getBidSell, insertBidSellOrOrder };
