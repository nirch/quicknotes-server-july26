const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    throw { status: 401, message: "No token provided" };
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser; // add user into the request (so other handlers will have the authenticated user)
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw { status: 401, message: "Token expired" };
    }
    throw { status: 401, message: "Invalid token" };
  }
}

module.exports = { authenticate };
