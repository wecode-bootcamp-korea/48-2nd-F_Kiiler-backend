const { AppDataSource } = require("./data-source");

const createUser = async (email, password) => {
  await AppDataSource.query(
    `
    INSERT INTO users (
      email,
      password      
    ) VALUES (
      ?,
      ?
    )
    `,
    [email, password]
  );
};

const getUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
      SELECT *
      FROM users u
      WHERE u.email = ?
    `,
    [email]
  );

  return user;
};
const getUserById = async (id) => {
  const [user] = await AppDataSource.query(
    `
      SELECT *
      FROM users u
      WHERE u.id = ?
    `,
    [id]
  );

  return user;
};

module.exports = { createUser, getUserByEmail, getUserById };
