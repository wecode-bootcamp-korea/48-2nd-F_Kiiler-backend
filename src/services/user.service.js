const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;

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
  const createUser = await userDao.createUser(
  email, 
  hashedPassword,
  agreeApp,
  agreeSms,
  agreeEmail
  );
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;
    throw error;
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;
    throw error;
  }
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

module.exports = { signUp, getUserById, signIn };