const express = require('express');
const bidController = require('../controllers/bid.controller');
const bidRouter = express.Router();

bidRouter.post('/sell', bidController.insertBidSellWaiting);
bidRouter.get('/:id', bidController.getBidSell);
bidRouter.post('/payment', bidController.insertBidSellOrOrder);

module.exports = { bidRouter };
