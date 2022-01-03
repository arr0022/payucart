var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.verifyAccessToken = (data, expiry) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, expiry);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error})
  }
};

module.exports.verifyRefreshToken = (data, expiry) => {
  try {
    return jwt.sign(data, process.env.JWT_REFRESH_KEY, expiry);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error})
  }
};
