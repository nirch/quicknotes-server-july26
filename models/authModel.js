const bcrypt = require("bcrypt");
const { sequelize } = require("../db/models/index.js");

async function login(email, password) {
  const query = `
  SELECT *
  FROM users
  WHERE email=:email
  `;
  const [results] = await sequelize.query(query, {
    replacements: { email },
  });
  const user = results[0];

  if (user && await bcrypt.compare(password, user.password)) {
    const { password: _, ...userNoPassword } = user;
    return userNoPassword;
  }
}

module.exports = { login };
