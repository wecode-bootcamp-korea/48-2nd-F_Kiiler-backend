const { AppDataSource } = require('./data.source');

const getSizeId = async (size) => {
  const sizeId = await AppDataSource.query(
    `select 
      sizes.id
      from sizes
      where type = ?`,
    [size]
  );
  return sizeId;
};

const searchBidProductSize = async (productId, getSizeId) => {
  const searchBidProductSize = await AppDataSource.query(
    `select 
    bid_product_size.id 
    from bid_product_size 
    where product_id = ? 
    and size_id = ?`,
    [productId, getSizeId]
  );
  return searchBidProductSize;
};

//Sell module//
const insertBidSell = async (sellerId, bidProductSizeId, status, price) => {
  const insertBidSell = await AppDataSource.query(
    `insert into 
      bid_sells
      (seller_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
    [sellerId, bidProductSizeId, status, price]
  );
  return insertBidSell;
};

const searchBidBuyInfo = async (bidProductSizeId, price) => {
  const bidBuyInfo = await AppDataSource.query(
    `select 
      id,
      buyer_id 
      from bid_buys 
      where bid_product_size_id = ?
      and price = ? 
      and status = "구매입찰" 
      order by created_at  
      limit 1`,
    [bidProductSizeId, price]
  );
  return bidBuyInfo[0];
};

const getBidSell = async (sellerId, bidSellId) => {
  const getBidSell = await AppDataSource.query(
    `select 
      bid_sells.id AS order_sell_number, 
      bid_sells.seller_id,
      bid_sells.status,
      bid_sells.price, 
      categories.name AS category ,
      brands.name AS brand,
      products.name AS product, 
      products.serial_number,
      products.color , 
      product_images.url
      from bid_sells 
      inner join bid_product_size 
      on bid_sells.bid_product_size_id = bid_product_size.id 
      left join products 
      on bid_product_size.product_id = products.id
      left join categories 
      on products.category_id = categories.id
      left join brands 
      on products.brand_id = brands.id
      left join product_images 
      on product_images.product_id = products.id
      where bid_sells.seller_id = ?
      and bid_sells.id = ?`,
    [sellerId, bidSellId]
  );
  return getBidSell;
};

const modifyStatusBidBuy = async (bidBuyId) => {
  const modifyStatusBidBuy = AppDataSource.query(
    `update 
      bid_buys 
      set status = "입찰완료" 
      where id = ?`,
    [bidBuyId]
  );
};

const insertOrder = async (
  sellerId,
  buyerId,
  bidProductSizeId,
  orderNumber,
  price
) => {
  const userOrder = await AppDataSource.query(
    `insert into 
    orders 
     (seller_id, 
      buyer_id, 
      bid_product_size_id,
      order_number,
      price) 
    values 
    (?,?,?,?,?)`,
    [sellerId, buyerId, bidProductSizeId, orderNumber, price]
  );
  return userOrder;
};

const searchOrder = async (orderId) => {
  const getOrderInfo = await AppDataSource.query(
    `select 
      orders.order_number, 
      orders.price, 
      categories.name AS category ,
      brands.name AS brand,
      products.name AS product, 
      products.serial_number,
      products.color , 
      product_images.url
      from orders 
      inner join bid_product_size 
        on orders.bid_product_size_id = bid_product_size.id 
      left join products 
        on bid_product_size.product_id = products.id
      left join categories 
        on products.category_id = categories.id
      left join brands 
        on products.brand_id = brands.id
      left join product_images 
        on product_images.product_id = products.id
      where orders.id = ?`,
    [orderId]
  );
  return getOrderInfo;
};

//Buys Module//
const insertBidBuy = async (buyerId, bidProductSizeId, status, price) => {
  const insertBidBuy = await AppDataSource.query(
    `insert into 
      bid_buys
      (buyer_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
    [buyerId, bidProductSizeId, status, price]
  );
  return insertBidBuy;
};

const getBidBuy = async (buyerId, bidSellId) => {
  const getBidBuy = await AppDataSource.query(
    `select 
      bid_buys.id AS order_sell_number, 
      bid_buys.buyer_id,
      bid_buys.status,
      bid_buys.price, 
      categories.name AS category ,
      brands.name AS brand,
      products.name AS product, 
      products.serial_number,
      products.color , 
      product_images.url
      from bid_buys 
      inner join bid_product_size 
      on bid_buys.bid_product_size_id = bid_product_size.id 
      left join products 
      on bid_product_size.product_id = products.id
      left join categories 
      on products.category_id = categories.id
      left join brands 
      on products.brand_id = brands.id
      left join product_images 
      on product_images.product_id = products.id
      where bid_buys.buyer_id = ?
      and bid_buys.id = ?`,
    [buyerId, bidSellId]
  );
  return getBidBuy;
};

const searchBidSellInfo = async (bidProductSizeId, price) => {
  const BidSellInfo = await AppDataSource.query(
    `select 
      bid_sells.id,
      bid_sells.seller_id 
      from bid_sells 
      where bid_product_size_id = ?
      and price = ? 
      and status = "판매입찰" 
      order by created_at 
      limit 1`,
    [bidProductSizeId, price]
  );
  return BidSellInfo[0];
};

const modifyStatusBidSell = async (bidSellId) => {
  const modifyStatusBidSell = AppDataSource.query(
    `update 
      bid_sells 
      set status = "입찰완료" 
      where id = ?`,
    [bidSellId]
  );
  return modifyStatusBidSell;
};

module.exports = {
  getSizeId,
  searchBidProductSize,
  insertBidSell,
  insertBidBuy,
  getBidSell,
  getBidBuy,
  searchBidBuyInfo,
  searchBidSellInfo,
  insertOrder,
  modifyStatusBidBuy,
  modifyStatusBidSell,
  searchOrder,
};
