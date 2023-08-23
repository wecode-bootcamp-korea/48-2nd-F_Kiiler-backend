const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDao = require("../models/user.dao");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10; // ~10 hashes/sec

  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const signUp = async (email, password) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.{8,15})/;

  if (!emailRegex.test(email)) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error("INVALID_USER");
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(email, hashedPassword);
  return createUser;
};

module.exports = { signUp, getUserById };
