const express = require('express');
const buyControllers = require('../controllers/buy.controller');
const { loginRequired } = require('../utils/auth');
const buyRouter = express.Router();

buyRouter.get('/:id', loginRequired, buyControllers.getBuyList);
module.exports = { buyRouter };
