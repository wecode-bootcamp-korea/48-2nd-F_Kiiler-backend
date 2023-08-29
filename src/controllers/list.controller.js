const listDao = require('../models/list.dao');
const { catchAsync } = require('../utils/error');
const listService = require('../services/list.service');

const getProductList = catchAsync(async (req, res) => {
  const { filterOptions } = req.query;
  const result = filterOptions
    ? await listDao.getListingsWithQueryBuilder(JSON.parse(filterOptions))
    : await listDao.getListingsWithQueryBuilder();
  res.status(201).json({ length: result.length, data: result });
});

module.exports = { getProductList };
