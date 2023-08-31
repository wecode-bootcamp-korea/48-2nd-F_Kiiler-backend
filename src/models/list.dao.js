const { AppDataSource } = require('./data.source');

const getProductsByCategorylist = async (
  orderingQuery,
  whereQuery,
  pageQuery
) => {
  const list = await AppDataSource.query(`
  SELECT sub.productId, sub.brand, sub.name, sub.url, sub.price
  FROM (
      SELECT p.id AS productId, b.name AS brand, p.name, pi.url,
             COALESCE(MIN(bb.price), 0) AS price
      FROM products p
      JOIN product_images pi ON pi.product_id = p.id
      JOIN bid_product_size bps ON bps.product_id = p.id
      JOIN sizes s ON s.id = bps.size_id
      JOIN brands b ON b.id = p.brand_id
      JOIN categories c ON c.id = p.category_id
      LEFT JOIN bid_buys bb ON bb.bid_product_size_id = bps.id
      ${whereQuery}
      GROUP BY p.id
      HAVING price IS NOT NULL
      ${orderingQuery}
      ${pageQuery} 
  ) AS sub;
  `);
  return list;
};

module.exports = { getProductsByCategorylist };
