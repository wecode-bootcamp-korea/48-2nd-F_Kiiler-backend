const { AppDataSource } = require('./data.source')
 
const getProductDetailById = async (id) => {
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
    const allTradeData = await AppDataSource.query(
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
    )

    const allBidSellData = await AppDataSource.query(
        `
    SELECT 
        s.type AS size, 
        bs.price AS sellPrice
    FROM 
        bid_product_size bps
    JOIN 
        bid_sells bs ON bs.bid_product_size_id = bps.id
    JOIN 
        sizes s ON s.id = bps.size_id
    WHERE 
        bps.product_id = ?
        `,
        [id]
    )

    const allBidBuyData = await AppDataSource.query(
        `
    SELECT 
        s.type AS size, 
        bb.price AS buyPrice
    FROM 
        bid_product_size bps
    JOIN 
        bid_buys bb ON bb.bid_product_size_id = bps.id
    JOIN 
        sizes s ON s.id = bps.size_id
    WHERE 
        bps.product_id = 1;
        `
    );
    const tradeDataLimit = allTradeData.slice(0,5)
    const bidSellDataLimit = allBidSellData.slice(0,5)
    const bidBuyDataLimit = allBidBuyData.slice(0,5)
        
    const all = [{
            allTradeData,
            allBidSellData,
            allBidBuyData}]

    const limit = [{
            tradeDataLimit,
            bidSellDataLimit,
            bidBuyDataLimit}]
    return [all, limit]
};

module.exports = { getProductDetailById, getTradeProductById }