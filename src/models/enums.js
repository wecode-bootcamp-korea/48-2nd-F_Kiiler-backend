const bidStatusEnum = Object.freeze({
  BUY_CONFIRMED: '구매입찰',
  SELL_CONFIRMED: '판매입찰',
  ORDER_CONFIRMED: '입찰완료',
  WAIT_CONFIRMED: '거래중',
});

module.exports = { bidStatusEnum };
