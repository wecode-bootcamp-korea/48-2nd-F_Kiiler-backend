const sellDao = require('../models/sell.dao');
const buyDao = require('../models/buy.dao');
const { catchAsync } = require('../utils/error');

const getSellList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;
  const result = size
    ? await sellDao.getSellSizeList(productId, size)
    : await sellDao.getSellList(productId);

  if (size) {
    const result2 = await buyDao.getBuySize(productId, size);
    result[0]['buyPrice'] = result2[0]['buyPrice'];
  }

  res.status(201).json({ data: result });
});

module.exports = { getSellList };
