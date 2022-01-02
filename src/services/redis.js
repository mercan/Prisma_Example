const redis = require("redis");
const Promise = require("bluebird");
const config = require("../config/index");

class RedisService {
  constructor(options) {
    this.options = options;
    this.client = Promise.promisifyAll(redis.createClient(options));

    this.client.on("connect", () => {
      console.log("Connection to Redis { service: Redis }");
    });

    this.client.on("error", (error) => {
      console.error(`Connection failed: ${error} { service: Redis }`);
    });

    this.client.connect();
  }

  init() {
    return this.client;
  }

  disconnect() {
    this.client.quit();
  }

  setKey(key, value, expireTime) {
    return this.client.set(key, value, "EX", expireTime);
  }

  deleteKey(key, email) {
    return this.client.del(`${key}:${email}`);
  }

  getKey(key, email) {
    return this.client.get(`${key}:${email}`);
  }
}

// Redis Config
const options = {
  url: config.redisURL,
  no_ready_check: true,
};

// Create Redis Service
module.exports = new RedisService(options);
