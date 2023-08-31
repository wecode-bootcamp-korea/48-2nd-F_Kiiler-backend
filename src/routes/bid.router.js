const express = require('express');
const bidSellController = require('../controllers/bid.sell.controller');
const bidRouter = express.Router();

bidRouter.post('/sell', bidSellController.insertBidSellWaiting);
bidRouter.get('/:id', bidSellController.getBidSell);
bidRouter.post('/payment', bidSellController.insertBidSellOrOrder);

module.exports = { bidRouter };
