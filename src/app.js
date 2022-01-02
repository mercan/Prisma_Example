const Fastify = require("fastify");

// Plugins
const helmetPlugin = require("fastify-helmet");
const formbodyPlugin = require("fastify-formbody");
const swaggerPlugin = require("fastify-swagger");

// Config
const swaggerConfig = require("./swagger/swagger");

// Routes
const routes = require("./api/routes/index.route");

module.exports = function build(opts = {}) {
  const fastify = Fastify(opts);

  // Initialize Plugins
  fastify.register(helmetPlugin);
  fastify.register(formbodyPlugin);
  fastify.register(swaggerPlugin, swaggerConfig);

  routes.forEach((route) => fastify.route(route));

  return fastify;
};
