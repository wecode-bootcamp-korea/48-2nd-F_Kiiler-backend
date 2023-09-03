const express = require('express');

const { bidBuyRouter } = require('./bid.buy.router');
const { bidSellRouter } = require('./bid.sell.router');
const { buyRouter } = require('./buy.router');
const { listRouter } = require('./list.router');
const { sellRouter } = require('./sell.router');
const { userRouter } = require('./user.router');
const { productRouter } = require('./product.router');

const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/bidsell', bidSellRouter);
routes.use('/bidbuy', bidBuyRouter);
routes.use('/sell', sellRouter);
routes.use('/buy', buyRouter);
routes.use('/product', listRouter);
routes.use('/productDetail', productRouter);
module.exports = { routes };
