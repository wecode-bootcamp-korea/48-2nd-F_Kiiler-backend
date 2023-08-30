const listDao = require('../models/list.dao');

const categoryService = async (sortBy, brand, category, limit, offset) => {
  const ordering = async (sortBy) => {
    switch (sortBy) {
      case 'price':
        return 'ORDER BY bb.price DESC';
      default:
        return 'ORDER BY bb.price';
    }
  };

  const getCategory = async (brand, category) => {
    if (!brand && !category) {
      return '';
    } else if (brand && !category) {
      return `WHERE b.name in (${brand})`;
    } else if (!brand && category) {
      return `WHERE c.name in (${category})`;
    } else {
      return `WHERE b.name in (${brand}) AND c.name in (${category})`;
    }
  };

  const getPage = async (limit, offset) => {
    offset = (offset - 1) * limit;
    return `LIMIT ${limit} OFFSET ${offset}`;
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
