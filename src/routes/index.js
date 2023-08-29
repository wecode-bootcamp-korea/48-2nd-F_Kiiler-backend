const express = require('express');

const { userRouter } = require('./user.router');
const { bidRouter } = require('./bid.router');

const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/bid', bidRouter);

module.exports = { routes };
