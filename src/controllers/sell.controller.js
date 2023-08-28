const sellDao = require('../models/sell.dao');
const buyDao = require('../models/buy.dao');
const { catchAsync } = require('../utils/error');

const getSellList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;

  if (size) {
    const result = await sellDao.getSellSizeList(productId, size);
    result2 = await buyDao.getBuySize(productId, size);
    result[0]['buyPrice'] = result2[0]['buyPrice'];
    res.status(201).json({ data: result });
  } else {
    const result = await sellDao.getSellList(productId);
    res.status(201).json({ data: result });
  }
});

module.exports = { getSellList };
