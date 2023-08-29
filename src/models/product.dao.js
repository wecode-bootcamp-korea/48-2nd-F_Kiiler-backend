const { AppDataSource } = require('./data.source')
 
const getProductById = async (id) => {
    return await AppDataSource.query(
        `
    SELECT 
        p.id as productId,
        p.serial_number AS serialNumber,
        p.price,
        DATE_FORMAT (p.release_date, '%y/%m/%d') AS releaseDate,
        p.color
    FROM
        products AS p
    WHERE
        p.id = ?
        `,
        [id]
     );
};

const getTradeProductById = async (id) => {
    return await AppDataSource.query(
        `
    SELECT
        s.type AS size,
        o.price AS tradePrice,
        DATE_FORMAT(o.created_at, '%y/%m/%d') AS tradeDate
    FROM
        orders o
    JOIN
        sizes s ON s.id = o.bid_product_size_id
    where o.id = ?
    ORDER BY
        created_at DESC
        `,
        [id]
    ); 
};

module.exports = { getProductById, getTradeProductById }