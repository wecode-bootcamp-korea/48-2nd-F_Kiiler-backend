const { catchAsync } = require('../utils/error');
const listService = require('../services/list.service');

const getProductList = catchAsync(async (req, res) => {
  const { sortBy, brand, category, limit, offset } = req.query;
  const result = await listService.categoryService(
    sortBy,
    brand,
    category,
    limit,
    offset
  );
  res.status(201).json({ length: result.length, data: result });
});

module.exports = { getProductList };
