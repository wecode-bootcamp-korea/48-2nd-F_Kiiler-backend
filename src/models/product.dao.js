const { AppDataSource } = require('./data.source');

const getProductDetailById = async (productId) => {
  return await AppDataSource.query(
    `
      SELECT 
          p.id as productId,
          b.name as brand,
          p.name as name,
          i.url as productImage,
          p.serial_number AS serialNumber,
          p.color,
          p.price as releasePrice,
          DATE_FORMAT (p.release_date, '%y/%m/%d') AS releaseDate
      FROM
          products AS p
      JOIN 
          brands b ON p.brand_id = b.id
      JOIN 
          product_images i ON p.id = i.product_id
      WHERE
          p.id = ?
    `,
    [productId]
  );
};

const getRecentTradeDataById = async (productId) => {
  const [recentTradeData] = await AppDataSource.query(
    ` 
      SELECT
          bid_product_size.id AS sizeId,
          s.type AS sizeType,
          SUM(orders.price) AS totalOrderPrice
      FROM
          bid_product_size
      LEFT JOIN
         orders ON orders.bid_product_size_id = bid_product_size.id
      JOIN
         sizes s ON s.id = bid_product_size.size_id
      WHERE
          bid_product_size.product_id = ?
      GROUP BY
          bid_product_size.id, s.type
      ORDER BY
          totalOrderPrice ASC
      LIMIT 1
    `,
    [productId]
  );
  return recentTradeData;
};

const getBuyPrice = async (productId) => {
  const [buyPrice] = await AppDataSource.query(
    ` 
      SELECT p.id, 
          min(bb.price) AS price
      FROM 
          bid_product_size bps
      LEFT JOIN 
          bid_buys bb ON bb.bid_product_size_id = bps.id
      JOIN 
          products p ON p.id = bps.product_id
      JOIN 
          product_images pi ON pi.product_id = p.id
      JOIN 
          sizes s ON s.id = bps.size_id
      JOIN 
          brands b ON b.id = p.brand_id
      JOIN 
          categories c ON c.id = p.category_id
      WHERE p.id = ?
      GROUP BY 
          p.id, 
          b.name, 
          p.name, 
          pi.url
    `,
    [productId]
  );
  return buyPrice;
};

const getSellPrice = async (productId) => {
  const [sellPrice] = await AppDataSource.query(
    ` 
      SELECT 
          p.id,
          max(bs.price) AS price
      FROM 
          bid_product_size bps
      LEFT JOIN 
          bid_sells bs ON bs.bid_product_size_id = bps.id
      JOIN 
           products p ON p.id = bps.product_id
      JOIN 
          sizes s ON s.id = bps.size_id
      JOIN 
          brands b ON b.id = p.brand_id
      JOIN 
          categories c ON c.id = p.category_id
      WHERE p.id = ?
      GROUP BY 
          p.id, 
          b.name, 
          p.name
    `,
    [productId]
  );
  return sellPrice;
};

const getRecentPrice = async (productId) => {
  const recentTradePrice = await AppDataSource.query(
    `
      SELECT
          s.type AS sizeType,
          JSON_OBJECT(
            'latestPrice', COALESCE(SUM(o.price), 0),
            'buyNowPrice', MIN(bb.price),
            'sellNowPrice', MAX(bs.price)
        ) AS priceData
      FROM 
          bid_product_size bp
      LEFT JOIN orders o ON o.bid_product_size_id = bp.id
      LEFT JOIN bid_buys bb ON bb.bid_product_size_id = bp.id
      LEFT JOIN bid_sells bs ON bs.bid_product_size_id = bp.id
      JOIN sizes s ON s.id = bp.size_id
      WHERE bp.product_id = ?
      GROUP BY 
          s.type
    `,
    [productId]
  );
  return recentTradePrice;
};

const getTradeProductById = async (productId) => {
  const allTradeData = await AppDataSource.query(
    `
      SELECT
          s.type AS size,
          o.price AS tradePrice,
          DATE_FORMAT(o.created_at, '%y/%m/%d') AS tradeDate
      FROM
          orders o
      JOIN
          sizes s ON s.id = o.bid_product_size_id
      WHERE 
          o.id = ?
      ORDER BY
          created_at DESC
      LIMIT 5
    `,
    [productId]
  );

  const allBidSellData = await AppDataSource.query(
    `
      SELECT 
          s.type AS size, 
          bs.price AS sellTargetPrice,
          COUNT(bs.price) AS amount
      FROM 
          bid_product_size bps
      JOIN 
          bid_sells bs ON bs.bid_product_size_id = bps.id
      JOIN 
          sizes s ON s.id = bps.size_id
      WHERE 
          bps.product_id = ?
      GROUP BY
          s.type, bs.price
      LIMIT 5
    `,
    [productId]
  );

  const allBidBuyData = await AppDataSource.query(
    `
      SELECT 
          s.type AS size, 
          bb.price AS buyTargetPrice,
          COUNT(bb.price) AS amount
      FROM 
          bid_product_size bps
      JOIN 
          bid_buys bb ON bb.bid_product_size_id = bps.id
      JOIN 
          sizes s ON s.id = bps.size_id
      WHERE 
          bps.product_id = 1
      GROUP BY
          s.type, bb.price
      LIMIT 5
    `,
    [productId]
  );

  const all = {
    allTradeData,
    allBidSellData,
    allBidBuyData,
  };

  return [all];
};

module.exports = {
  getProductDetailById,
  getBuyPrice,
  getSellPrice,
  getRecentPrice,
  getRecentTradeDataById,
  getTradeProductById,
};
