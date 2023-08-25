const { sellRouter } = require('./sellRouter');
express = require('express');
const routes = express.Router();

routes.use('/list', sellRouter);

module.exports = { routes };
