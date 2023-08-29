const { AppDataSource } = require("./data.source");

const getProductById = async (id) => {
  return await AppDataSource.query(
    `
    SELECT
        p.id as productId,
        b.name as brand,
        p.name,
        i.url as productImage
    FROM 
        products p
    LEFT JOIN 
        brands b ON p.brand_id = b.id
    JOIN 
        product_images i ON p.id = i.product_id
    WHERE 
    p.id = ?
    `,
    [id]
  );
};

module.exports = { getProductById };
