// const buyDao = require('../models/buy.dao');
// const getBuyPrice = async (productId) => {
//   //   await buyDao.getBuyList(productId);
//   let ids = [];
//   const get = await listDao.getProductList();
//   for (let j = 0; j < get.length; j++) {
//     let id = get[j]['id'];
//     ids.push(id);
//   }
//   console.log(ids);
//   //   for (let i = 0; i < getPrice.length; i++) {
//   //     console.log(getPrice[i]['price']);
//   //   }
// };

// module.exports = { getBuyPrice };
const listDao = require('../models/list.dao');

class ListingQueryBuilder {
  constructor(filterOptions) {
    this.filterOptions = filterOptions;
  }

  listingBrandFilterBuilder(listingBrands) {
    const quotedBrands = listingBrands.map((brand) => `'${brand}'`).join(', ');
    console.log(listingBrands);
    console.log(quotedBrands);
    return `b.name IN (${quotedBrands})`;
  }

  listingCategoryFilterBuilder(listinCategories) {
    const quotedCategories = listinCategories
      .map((category) => `'${category}'`)
      .join(', ');
    return `c.name IN (${quotedCategories})`;
  }

  buildWhereClause() {
    const builderSet = {
      brand: this.listingBrandFilterBuilder,
      category: this.listingCategoryFilterBuilder,
    };

    const whereClauses = Object.entries(this.filterOptions).map(
      ([key, value]) => builderSet[key](value)
    );

    console.log('whereClauses : ', whereClauses);

    if (whereClauses.length !== 0) {
      return `WHERE ${whereClauses.join(' AND ')}`;
    } else {
      return '';
    }
  }

  build() {
    const filterQuery = this.buildWhereClause();

    // if (filterQuery) {
    return filterQuery;
    // } else {
    //   return '';
    // }
  }
}

module.exports = { ListingQueryBuilder };
