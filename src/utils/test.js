const orderNumber = async () => {
  const year = new Date().getFullYear();
  const stringYear = String(year);
  const randomNumber = Math.floor(Math.random() * 10000);
  const orderNumber = stringYear + randomNumber;
  return orderNumber;
};

module.exports = { orderNumber };
