const { AppDataSource } = require('./data.source');

const getSellList = async (prodcutId) => {
  const sell = await AppDataSource.query(
    `SELECT 
        bps.id, 
        p.name,
        p.serial_number,
        pi.url,
        s.type, 
        MAX(bs.price) AS sellPrice
        FROM bid_product_size bps
        LEFT JOIN bid_sells bs
            ON bps.id = bs.bid_product_size_id
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

  return sell;
};

const getSellSizeList = async (prodcutId, size) => {
  const sell = await AppDataSource.query(
    `SELECT 
    bs.id, 
    p.name,
    p.serial_number as serialNumber,
    pi.url,
    s.type AS size, 
    MAX(bs.price) AS price
    FROM bid_product_size bps
  LEFT JOIN bid_sells bs
      ON bps.id = bs.bid_product_size_id
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

  return sell;
};

const getSellSize = async (prodcutId, size) => {
  const sell = AppDataSource.query(
    `SELECT 
    MAX(bs.price) AS sellPrice
    FROM bid_product_size bps
    LEFT JOIN bid_sells bs
        ON bps.id = bs.bid_product_size_id
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
  return sell;
};

module.exports = { getSellList, getSellSizeList, getSellSize };
