const authModel = require("../models/authModel.js");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { status: 400, message: "email or password missing" };
    }

    const user = await authModel.login(email, password);
    if (!user) {
      throw { status: 401, message: "invalid email or password" };
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };