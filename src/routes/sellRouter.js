const express = require('express');
const sellControllers = require('../controllers/sellControllers');
const sellRouter = express.Router();

sellRouter.get('/sell/:id', sellControllers.getSellList);

module.exports = { sellRouter };
