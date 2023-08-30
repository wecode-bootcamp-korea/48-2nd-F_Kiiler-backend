const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productDao = require("../models/product.dao");

const getProductDetailById = async (id) => {
    return await productDao.getProductDetailById(id);
};

const getTradeProductById = async (id) => {
    return await productDao.getTradeProductById(id);
}

module.exports = { getProductDetailById, getTradeProductById };