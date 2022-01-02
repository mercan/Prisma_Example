const { port } = require("./config/index");

const server = require("./app")({
  logger: true,
  trustProxy: true,
});

// Start the server
server.listen(port, "0.0.0.0", (err) => {
  // If there was an error, log it
  if (err) {
    console.error(`Error starting server: ${err}`, { service: "Fastify" });
    process.exit(1);
  }
});
