const express = require('express');
const sellControllers = require('../controllers/sell.controller');
const { loginRequired } = require('../utils/auth');
const sellRouter = express.Router();

sellRouter.get('/sell/:id', loginRequired, sellControllers.getSellList);
module.exports = { sellRouter };
