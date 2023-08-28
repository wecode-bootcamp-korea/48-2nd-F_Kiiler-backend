const { AppDataSource } = require('./data.source')
 

const getProductById = async (productId) => {
     const test1 = await AppDataSource.query(
        `
    SELECT 
        p.id, 
        p.serial_number AS serialNumber
        p.price,
        DATE_FORMAT (p.release_date, '%y/%m/%d') AS releaseDate,
        p.color
    FROM
        products AS p
    WHERE
        p.id = ?
        `,
        [productId]
     );
     return test1;

};

const getTradeProductById = async () => {
    const test2 = await AppDataSource.query(
        `
        SELECT
        s.type AS size,
        o.price AS tradePrice,
        DATE_FORMAT(o.created_at, '%y/%m/%d') AS tradeDate
       
        FROM
        orders o
        JOIN
        sizes s ON s.id = o.bid_product_size_id
        ORDER BY
        created_at DESC;
        `
    );
        return test2;
   
};

module.exports = { getProductById, getTradeProductById }