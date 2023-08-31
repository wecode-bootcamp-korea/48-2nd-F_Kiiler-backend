const express = require('express');
const { loginRequired } = require('../utils/auth');

const bidSellController = require('../controllers/bid.sell.controller');
const bidBuyController = require('../controllers/bid.buy.controller');
const bidRouter = express.Router();

bidRouter.post('/sell', loginRequired, bidSellController.insertBidSellWaiting);
bidRouter.get('/:id', loginRequired, bidSellController.getBidSell);
bidRouter.post(
  '/payment',
  loginRequired,
  bidSellController.insertBidSellOrOrder
);

bidRouter.post('/buy', loginRequired, bidBuyController.insertBidBuyWaiting);
bidRouter.get('/:id', loginRequired, bidBuyController.getBidBuy);
bidRouter.post('/payment', loginRequired, bidBuyController.insertBidBuyOrOrder);
module.exports = { bidRouter };
