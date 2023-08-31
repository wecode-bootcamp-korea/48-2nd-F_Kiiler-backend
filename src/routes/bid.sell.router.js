const express = require('express');
const { loginRequired } = require('../utils/auth');

const bidSellController = require('../controllers/bid.sell.controller');
const bidSellRouter = express.Router();

bidSellRouter.post(
  '/sell',
  loginRequired,
  bidSellController.insertBidSellWaiting
);
bidSellRouter.get('/:id', loginRequired, bidSellController.getBidSell);
bidSellRouter.post(
  '/payment',
  loginRequired,
  bidSellController.insertBidSellOrOrder
);

module.exports = { bidSellRouter };
