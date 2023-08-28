const { AppDataSource } = require('./data.source');

const getBuyList = async (prodcutId) => {
  const buy = await AppDataSource.query(
    `SELECT 
      bb.id, 
      p.name,
      p.serial_number,
      pi.url,
      s.type, 
      MIN(bb.price) AS buy_price
      FROM bid_buys bb
      JOIN bid_product_size bps
          ON bb.bid_product_size_id = bps.id
      JOIN products p
          ON p.id = bps.product_id
      JOIN product_images pi
          ON pi.product_id = p.id
      JOIN sizes s
          ON s.id = bps.size_id
      WHERE p.id = ? 
      GROUP BY s.type;`,
    [prodcutId]
  );

  return buy;
};

const getBuySizeList = async (prodcutId, size) => {
  const buy = await AppDataSource.query(
    `SELECT 
      bb.id, 
      p.name,
      p.serial_number,
      pi.url,
      s.type, 
      MIN(bb.price) AS buy_price
      FROM bid_buys bb
      JOIN bid_product_size bps
          ON bb.bid_product_size_id = bps.id
      JOIN products p
          ON p.id = bps.product_id
      JOIN product_images pi
          ON pi.product_id = p.id
      JOIN sizes s
          ON s.id = bps.size_id
      WHERE p.id = ? AND s.type = ?
      GROUP BY s.type;`,
    [prodcutId, size]
  );

  return buy;
};

module.exports = { getBuyList, getBuySizeList };
