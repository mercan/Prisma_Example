require("dotenv").config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

module.exports = {
  env,
  port,
  jwtSecretKey: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  redisLabsURL: process.env.REDIS_URL_LABS,
  redisUpstashURL: process.env.REDIS_URL_UPSTASH,
  swaggerRoutePrefix: "/documentation",
};
