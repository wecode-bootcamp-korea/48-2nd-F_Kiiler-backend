const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productDao = require("../models/product.dao");

const getProductById = async (productId) => {
    return await productDao.getProductById(productId);
};


const getTradeProductById = async () => {
    return await productDao.getTradeProductById();
}
module.exports = { getProductById, getTradeProductById };




