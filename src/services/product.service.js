const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productDao = require("../models/product.dao");

const getProductDetailById = async (id) => {
    return await productDao.getProductDetailById(id);
};

const getTradeProductById = async (id) => {
    const tradeAllOfProduct = await productDao.getTradeProductById(id);

    return {
        tradeAllOfProduct: tradeAllOfProduct[0],
        tradeLimit: tradeAllOfProduct[1]
    }
}

module.exports = { getProductDetailById, getTradeProductById };