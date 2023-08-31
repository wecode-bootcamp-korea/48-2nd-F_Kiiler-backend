const listDao = require('../models/list.dao');

const categoryService = async (sortBy, brand, category, limit, offset) => {
  const ordering = async (sortBy) => {
    switch (sortBy) {
      case 'price':
        return 'ORDER BY bb.price DESC';
      default:
        return 'ORDER BY bb.price ';
    }
  };

  const getCategory = async (brand, category) => {
    const brandClause = brand ? `b.name IN (${brand})` : '';
    const categoryClause = category ? ` c.name IN (${category})` : '';

    return [brandClause, categoryClause].filter(Boolean).join('AND');
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
