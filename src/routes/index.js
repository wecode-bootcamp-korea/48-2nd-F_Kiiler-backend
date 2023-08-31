const { buyRouter } = require('./buy.router');
const { listRouter } = require('./list.router');
const { sellRouter } = require('./sell.router');
const { userRouter } = require('./user.router');

express = require('express');
const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/sell', sellRouter);
routes.use('/buy', buyRouter);
routes.use('/product', listRouter);
module.exports = { routes };
