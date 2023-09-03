const buyDao = require('../models/buy.dao');
const sellDao = require('../models/sell.dao');
const { catchAsync } = require('../utils/error');

const getBuyList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;
  console.log(size);
  const result = size
    ? await buyDao.getBuySizeList(productId, size)
    : await buyDao.getBuyList(productId);

  if (size) {
    const result2 = await sellDao.getSellSize(productId, size);
    result[0]['sellPrice'] = result2[0]['sellPrice'];
  }

  res.status(201).json({ data: result });
});

module.exports = { getBuyList };
