const { env, port, swaggerRoutePrefix } = require("../config/index");

module.exports = {
  routePrefix: swaggerRoutePrefix,
  openapi: {
    info: {
      title: "Prisma API",
      version: "1.0.0",
      contact: {
        name: "İbrahim Can Mercan",
        email: "imrcn77@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development",
      },
    ],
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "auth", description: "Authentication related end-points" }],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
            emailVerified: { type: "boolean", default: false },
            password: { type: "string", format: "password" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  staticCSP: true,
  exposeRoute: true,
};
