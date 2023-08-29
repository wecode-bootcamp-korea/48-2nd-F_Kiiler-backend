const { ListingQueryBuilder } = require('../services/list.service');
const { AppDataSource } = require('./data.source');

const getListingsWithQueryBuilder = async (filterOptions) => {
  if (!filterOptions) {
    const listings = await AppDataSource.query(
      `SELECT p.id, b.name as brand, p.name, pi.url,min(bb.price) AS price
      FROM bid_product_size bps
      LEFT JOIN bid_buys bb
      ON bb.bid_product_size_id = bps.id
      JOIN products p
      ON p.id = bps.product_id
      JOIN product_images pi
      ON pi.product_id = p.id
      JOIN sizes s
      ON s.id = bps.size_id
      JOIN brands b
      ON b.id = p.brand_id
      GROUP BY p.id;
          `
    );

    return listings;
  }
  const filterQuery = new ListingQueryBuilder(filterOptions).build();
  const listings = await AppDataSource.query(
    `SELECT p.id, b.name as brand, p.name, pi.url,min(bb.price) AS price
    FROM bid_product_size bps
    LEFT JOIN bid_buys bb
    ON bb.bid_product_size_id = bps.id
    JOIN products p
    ON p.id = bps.product_id
    JOIN product_images pi
    ON pi.product_id = p.id
    JOIN sizes s
    ON s.id = bps.size_id
    JOIN brands b
    ON b.id = p.brand_id
          ${filterQuery}
          GROUP BY p.id;`
  );

  return listings;
};

module.exports = { getListingsWithQueryBuilder };
