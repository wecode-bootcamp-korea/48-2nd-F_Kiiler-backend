const sellDao = require('../models/sellDao');
const { catchAsync } = require('../utils/error');

const getSellList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await sellDao.getSellList(productId);
  res.status(201).json({ data: result });
});

module.exports = { getSellList };
