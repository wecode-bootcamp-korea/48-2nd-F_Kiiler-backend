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

const existingBidSellInfo = async (status, bidProductSizeId, price) => {
  const [bidSellInfo] = await AppDataSource.query(
    `select 
      id,
      seller_id 
      from bid_sells 
      where status = ?
      and bid_product_size_id = ?
      and price = ? 
      order by created_at  
      limit 1`,
    [status, bidProductSizeId, price]
  );

  return bidSellInfo;
};

const existingBidBuyInfo = async (buyerId, status, bidProductSizeId, price) => {
  const [bidBuyInfo] = await AppDataSource.query(
    `select 
      id
      from bid_buys 
      where buyer_id = ?
      and status = ?
      and bid_product_size_id = ?
      and price = ? 
      order by created_at
      limit 1`,
    [buyerId, status, bidProductSizeId, price]
  );
  return bidBuyInfo;
};
const modifyAndInsertBidBuy = async (
  bidSellId,
  buyerId,
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
      bid_sells 
      set status = ?
      where id = ?`,
      [status, bidSellId]
    );
    const bidBuyId = await queryRunner.query(
      `insert into 
      bid_buys
      (buyer_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
      [buyerId, bidProductSizeId, status, price]
    );
    await queryRunner.commitTransaction();
    return bidBuyId.insertId;
  } catch {
    await queryRunner.rollbackTransaction();
    const err = new Error('INVALID_DATA');
    err.statusCode = 401;
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const insertOnlyBidSell = async (buyerId, bidProductSizeId, status, price) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const bidBuyId = await queryRunner.query(
      `insert into 
      bid_buys
      (buyer_id,bid_product_size_id,status,price) 
      values (?,?,?,?)`,
      [buyerId, bidProductSizeId, status, price]
    );
    await queryRunner.commitTransaction();
    return bidBuyId.insertId;
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
  bidSellId,
  bidBuyId,
  point,
  buyerId,
  bidSellerId,
  bidProductSizeId,
  shortUuid,
  orderPrice
) => {
  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const modifyBidSell = await queryRunner.query(
      `update
        bid_sells
        set status = ?
        where id = ?`,
      [status, bidSellId]
    );
    const modifyBidBuy = await queryRunner.query(
      `update 
        bid_buys 
        set status = ?
        where id = ?`,
      [status, bidBuyId]
    );
    const modifyUserPoint = await queryRunner.query(
      `update 
      users 
      set point = ?
      where id = ?`,
      [point, buyerId]
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
      [bidSellerId, buyerId, bidProductSizeId, shortUuid, orderPrice]
    );
    await queryRunner.commitTransaction();
    return insertOrder.insertId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const modifyBidSell = async (status, bidBuyId, point, buyerId) => {
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
    await queryRunner.query(
      `update 
        users 
        set point = ?
        where id = ?`,
      [point, buyerId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const getBidBuy = async (bidBuyId) => {
  const getBidBuy = await AppDataSource.query(
    `select 
      users.nickname AS buyerName, 
      users.point , 
      products.name AS product,  
      products.serial_number, 
      sizes.type,  bid_buys.price,  
      product_images.url 
      from bid_buys 
      left join bid_product_size 
      on bid_buys.bid_product_size_id = bid_product_size.id 
      left join sizes 
      on bid_product_size.size_id = sizes.id 
      left join users 
      on bid_buys.seller_id = users.id 
      left join products  
      on bid_product_size.product_id = products.id 
      left join product_images 
      on product_images.product_id = products.id 
      where bid_buys.id = ?`,
    [bidBuyId]
  );
  return getBidBuy;
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
      on orders.buyer_id = users.id 
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
  getBidBuy,
  insertOrder,
  searchOrder,
  existingBidSellInfo,
  existingBidBuyInfo,
  insertOnlyBidSell,
  modifyAndInsertBidBuy,
  modifyBidSell,
};
