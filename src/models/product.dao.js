const { AppDataSource } = require('./data.source')

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
    )

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
    )

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
            allBidBuyData}
            
    return [all]
};

module.exports = { getProductDetailById, getTradeProductById }