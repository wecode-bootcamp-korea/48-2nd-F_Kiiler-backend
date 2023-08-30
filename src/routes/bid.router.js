const express = require('express');

const bidController = require('../controllers/bid.controller');

const bidRouter = express.Router();

bidRouter.post('/sell', bidController.insertBidSellWaiting);
bidRouter.post('/sellOrOrder', bidController.insertBidSellOrOrder);

module.exports = { bidRouter };
