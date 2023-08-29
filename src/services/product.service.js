const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productDao = require("../models/product.dao");

const getProductById = async (id) => {
    return await productDao.getProductById(id);
};

const getTradeProductById = async (id) => {
    return await productDao.getTradeProductById(id);
}

module.exports = { getProductById, getTradeProductById };