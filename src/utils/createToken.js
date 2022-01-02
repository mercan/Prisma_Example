const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = ({ id: userId, firstName, lastName, email }) =>
  jwt.sign(
    {
      userId,
      firstName,
      lastName,
      email,
    },
    config.jwtSecretKey,
    {
      algorithm: config.jwtAlgorithm,
      expiresIn: config.jwtExpiresIn,
    }
  );
