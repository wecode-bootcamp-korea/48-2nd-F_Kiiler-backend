const buyDao = require('../models/buy.dao');
const sellDao = require('../models/sell.dao');
const { catchAsync } = require('../utils/error');

const getBuyList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;
  if (size) {
    const result = await buyDao.getBuySizeList(productId, size);
    result2 = await sellDao.getSellSize(productId, size);
    result[0]['sellPrice'] = result2[0]['sellPrice'];
    res.status(201).json({ data: result });
  } else {
    const result = await buyDao.getBuyList(productId);
    res.status(201).json({ data: result });
  }
});

module.exports = { getBuyList };
