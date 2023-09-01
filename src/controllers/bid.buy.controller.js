const bidBuyService = require('../services/bid.buy.service');
const { catchAsync } = require('../utils/error');

const insertBidBuyWaiting = catchAsync(async (req, res) => {
  const { productId, size, price } = req.body;
  const user = req.user;
  const bidBuy = await bidBuyService.insertBidBuyWaiting(
    user.id,
    productId,
    size,
    price
  );
  let arr = [];
  let object = { id: bidBuy };
  arr.push(object);

  res.status(201).json({ data: arr });
});

const getBidBuy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const getBidBuy = await bidBuyService.getBidBuy(id);
  res.status(201).json({ data: getBidBuy });
});

const insertBidBuyOrOrder = catchAsync(async (req, res) => {
  const { productId, size, price, orderPrice, point } = req.body;
  const user = req.user;
  const bidBuyOrOrder = await bidBuyService.insertBidBuyOrOrder(
    user.id,
    productId,
    size,
    price,
    orderPrice,
    point
  );
  res.status(201).json({ data: bidBuyOrOrder });
});

module.exports = { insertBidBuyWaiting, getBidBuy, insertBidBuyOrOrder };
