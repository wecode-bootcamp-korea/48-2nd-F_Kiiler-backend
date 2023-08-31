const express = require('express');
const listController = require('../controllers/list.controller');
const listRouter = express.Router();

listRouter.get('/list', listController.getProductList);

module.exports = { listRouter };
