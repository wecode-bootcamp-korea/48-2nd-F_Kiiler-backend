const bidSellService = require('../services/bid.sell.service');
const { catchAsync } = require('../utils/error');

const insertBidSellWaiting = catchAsync(async (req, res) => {
  const { productId, size, price } = req.body;
  const user = req.user;

  const bidSell = await bidSellService.insertBidSellWaiting(
    user.id,
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
  const { productId, size, price, orderPrice, point } = req.body;
  const user = req.user;
  const bidSellOrOrder = await bidSellService.insertBidSellOrOrder(
    user.id,
    productId,
    size,
    price,
    orderPrice,
    point
  );
  res.status(201).json({ data: bidSellOrOrder });
});

module.exports = { insertBidSellWaiting, getBidSell, insertBidSellOrOrder };
