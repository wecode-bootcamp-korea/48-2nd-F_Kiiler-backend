const { sellRouter } = require('./sell.router');
const { userRouter } = require('./user.router');
express = require('express');
const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/list', sellRouter);

module.exports = { routes };
