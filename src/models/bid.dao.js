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

const existingBidBuyInfo = async (status, bidProductSizeId, price) => {
  const [bidBuyInfo] = await AppDataSource.query(
    `select 
      id,
      buyer_id 
      from bid_buys 
      where status = ?
      and bid_product_size_id = ?
      and price = ? 
      order by created_at  
      limit 1`,
    [status, bidProductSizeId, price]
  );

  return bidBuyInfo;
};

const existingBidSellInfo = async (
  sellerId,
  status,
  bidProductSizeId,
  price
) => {
  const [bidSellInfo] = await AppDataSource.query(
    `select 
      id
      from bid_sells 
      where seller_id = ?
      and status = ?
      and bid_product_size_id = ?
      and price = ? 
      order by created_at
      limit 1`,
    [sellerId, status, bidProductSizeId, price]
  );
  return bidSellInfo;
};

const modifyStatusBidBuy = async (status, bidBuyId) => {
  const modifyStatusBidBuy = AppDataSource.query(
    `update 
      bid_buys 
      set status = ?
      where id = ?`,
    [status, bidBuyId]
  );
};

const modifyStatusBidSell = async (status, bidSellId) => {
  const modifyStatusBidSell = AppDataSource.query(
    `update 
      bid_sells 
      set status = ?
      where id = ?`,
    [status, bidSellId]
  );
};

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

const getBidSell = async (bidSellId) => {
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
      where bid_sells.id = ?`,
    [bidSellId]
  );
  return getBidSell;
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

module.exports = {
  getSizeId,
  searchBidProductSize,
  insertBidSell,
  getBidSell,
  insertOrder,
  modifyStatusBidBuy,
  modifyStatusBidSell,
  searchOrder,
  existingBidSellInfo,
  existingBidBuyInfo,
};
