const { application } = require('express');
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
const modifyAndInsertBidSell = async (
  bidBuyId,
  sellerId,
  bidProductSizeId,
  status,
  price
) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `update 
      bid_buys 
      set status = ?
      where id = ?`,
      [status, bidBuyId]
    );
    const bidSellId = await queryRunner.query(
      `insert into 
      bid_sells
      (seller_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
      [sellerId, bidProductSizeId, status, price]
    );
    await queryRunner.commitTransaction();
    return bidSellId.insertId;
  } catch {
    await queryRunner.rollbackTransaction();
    const err = new Error('INVALID_DATA');
    err.statusCode = 401;
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const insertOnlyBidSell = async (sellerId, bidProductSizeId, status, price) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const bidSellId = await queryRunner.query(
      `insert into 
      bid_sells
      (seller_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
      [sellerId, bidProductSizeId, status, price]
    );
    await queryRunner.commitTransaction();
    return bidSellId.insertId;
  } catch {
    await queryRunner.rollbackTransaction();
    const err = new Error('INVALID_DATA');
    err.statusCode = 401;
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const insertOrder = async (
  status,
  bidBuyId,
  bidSellId,
  point,
  sellerId,
  bidBuyerId,
  bidProductSizeId,
  shortUuid,
  orderPrice
) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const modifyBidBuy = await queryRunner.query(
      `update
        bid_buys
        set status = ?
        where id = ?`,
      [status, bidBuyId]
    );
    const modifyBidSell = await queryRunner.query(
      `update 
        bid_sells 
        set status = ?
        where id = ?`,
      [status, bidSellId]
    );
    const modifyUserPoint = await queryRunner.query(
      `update 
      users 
      set point = ?
      where id = ?`,
      [point, sellerId]
    );
    const insertOrder = await queryRunner.query(
      `insert into 
        orders 
        (seller_id, 
          buyer_id, 
          bid_product_size_id,
          order_number,
          price) 
        values 
        (?,?,?,?,?)`,
      [sellerId, bidBuyerId, bidProductSizeId, shortUuid, orderPrice]
    );
    await queryRunner.commitTransaction();
    return insertOrder.insertId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const modifyBidSell = async (status, bidSellId, point, sellerId) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `update 
        bid_sells 
        set status = ?
        where id = ?`,
      [status, bidSellId]
    );
    await queryRunner.query(
      `update 
        users 
        set point = ?
        where id = ?`,
      [point, sellerId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const getBidSell = async (bidSellId) => {
  const getBidSell = await AppDataSource.query(
    `select 
      users.nickname AS sellerName, 
      users.point , 
      products.name AS product,  
      products.serial_number, 
      sizes.type,  bid_sells.price,  
      product_images.url 
      from bid_sells 
      left join bid_product_size 
      on bid_sells.bid_product_size_id = bid_product_size.id 
      left join sizes 
      on bid_product_size.size_id = sizes.id 
      left join users 
      on bid_sells.seller_id = users.id 
      left join products  
      on bid_product_size.product_id = products.id 
      left join product_images 
      on product_images.product_id = products.id 
      where bid_sells.id = ?`,
    [bidSellId]
  );
  return getBidSell;
};

const searchOrder = async (orderId) => {
  const getOrderInfo = await AppDataSource.query(
    `select 
      orders.order_number, 
      users.nickname, 
      products.name AS product, 
      products.serial_number, 
      orders.price, 
      product_images.url 
      from orders 
      inner join bid_product_size 
      on orders.bid_product_size_id = bid_product_size.id 
      left join users 
      on orders.seller_id = users.id 
      left join products 
      on bid_product_size.product_id = products.id
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
  getBidSell,
  insertOrder,
  searchOrder,
  existingBidSellInfo,
  existingBidBuyInfo,
  insertOnlyBidSell,
  modifyAndInsertBidSell,
  modifyBidSell,
};
