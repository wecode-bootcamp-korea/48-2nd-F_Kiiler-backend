const { AppDataSource } = require('./data.source');

const getBuyList = async (prodcutId) => {
  const buy = await AppDataSource.query(
    `SELECT 
      bps.size_id AS id, 
      p.name,
      p.serial_number as serialNumber,
      pi.url,
      s.type AS size, 
      MIN(bb.price) AS price
      FROM bid_product_size bps
      LEFT JOIN bid_buys bb
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
    bps.product_id AS productId, 
    p.name,
    p.serial_number as serialNumber,
    pi.url,
    s.type AS size, 
    MIN(bb.price) AS price
    FROM bid_product_size bps
    LEFT JOIN bid_buys bb
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

const getBuySize = async (prodcutId, size) => {
  const buy = AppDataSource.query(
    `SELECT 
      MIN(bb.price) AS buyPrice
      FROM bid_product_size bps
    LEFT JOIN bid_buys bb
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

module.exports = { getBuyList, getBuySizeList, getBuySize };
