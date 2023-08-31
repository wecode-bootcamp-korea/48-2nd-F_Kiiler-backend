const listDao = require('../models/list.dao');

const categoryService = async (sortBy, brand, category, limit, offset) => {
  const ordering = async (sortBy) => {
    switch (sortBy) {
      case 'price':
        return 'ORDER BY sub.price DESC';
      default:
        return 'ORDER BY sub.price ';
    }
  };

  const getCategory = async (brand, category) => {
    return !brand && !category
      ? ''
      : brand && !category
      ? `WHERE b.name IN (${brand})`
      : !brand && category
      ? `WHERE c.name IN (${category})`
      : `WHERE b.name IN (${brand}) AND c.name IN (${category})`;
  };

  const getPage = (limit, offset) => {
    limit = 8;
    const page = (offset - 1) * limit;
    return `LIMIT ${limit} OFFSET ${page}`;
  };

  const orderingQuery = await ordering(sortBy);
  const whereQuery = await getCategory(brand, category);
  const pageQuery = await getPage(limit, offset);
  return await listDao.getProductsByCategorylist(
    orderingQuery,
    whereQuery,
    pageQuery
  );
};

module.exports = { categoryService };
