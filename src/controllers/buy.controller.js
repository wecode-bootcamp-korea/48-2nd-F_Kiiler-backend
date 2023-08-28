const buyDao = require('../models/buy.dao');
const { catchAsync } = require('../utils/error');

const getBuyList = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const size = req.query.size;

  if (size) {
    const result = await buyDao.getBuySizeList(productId, size);
    res.status(201).json({ data: result });
  } else {
    const result = await buyDao.getBuyList(productId);
    res.status(201).json({ data: result });
  }
});

module.exports = { getBuyList };
