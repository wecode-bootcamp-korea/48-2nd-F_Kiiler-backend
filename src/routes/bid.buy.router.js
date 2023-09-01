const express = require('express');
const { loginRequired } = require('../utils/auth');

const bidBuyController = require('../controllers/bid.buy.controller');
const bidBuyRouter = express.Router();

bidBuyRouter.post('/buy', loginRequired, bidBuyController.insertBidBuyWaiting);
bidBuyRouter.get('/:id', loginRequired, bidBuyController.getBidBuy);
bidBuyRouter.post(
  '/payment',
  loginRequired,
  bidBuyController.insertBidBuyOrOrder
);
module.exports = { bidBuyRouter };
