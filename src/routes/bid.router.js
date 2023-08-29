const express = require('express');

const bidController = require('../controllers/bid.controller');

const bidRouter = express.Router();

bidRouter.post('/bidSell', bidController.insertBidSellOrOrder);
bidRouter.post('/bidBuy', bidController.insertBidBuyOrOrder);
module.exports = { bidRouter };
