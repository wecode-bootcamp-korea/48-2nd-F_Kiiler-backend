const sellDao = require('../models/sell.dao');
const { catchAsync } = require('../utils/error');

const getSellList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;

  if (size) {
    const result = await sellDao.getSellSizeList(productId, size);
    res.status(201).json({ data: result });
  } else {
    const result = await sellDao.getSellList(productId);
    res.status(201).json({ data: result });
  }
});

module.exports = { getSellList };
