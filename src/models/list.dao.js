const { AppDataSource } = require('./data.source');

const getProductsByCategorylist = async (
  orderingQuery,
  whereQuery,
  pageQuery
) => {
  const list = await AppDataSource.query(`
    SELECT p.id, b.name as brand, p.name, pi.url, min(bb.price) AS price
    FROM bid_product_size bps
    LEFT JOIN bid_buys bb ON bb.bid_product_size_id = bps.id
    JOIN products p ON p.id = bps.product_id
    JOIN product_images pi ON pi.product_id = p.id
    JOIN sizes s ON s.id = bps.size_id
    JOIN brands b ON b.id = p.brand_id
    JOIN categories c ON c.id = p.category_id
    ${whereQuery}
    GROUP BY p.id
    ${orderingQuery}
    ${pageQuery}

  `);
  return list;
};

module.exports = { getProductsByCategorylist };
