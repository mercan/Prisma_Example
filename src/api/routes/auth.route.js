const authController = require("../controllers/auth.controller");

// Swagger Schema
const registerSchema = require("../../swagger/schema/auth/registerSchema.json");
const loginSchema = require("../../swagger/schema/auth/loginSchema.json");
const verifyEmailSchema = require("../../swagger/schema/auth/verifyEmailSchema.json");

const routes = [
  {
    method: "POST",
    url: `/auth/register`,
    schema: registerSchema,
    handler: authController.register,
  },
  {
    method: "POST",
    url: `/auth/login`,
    schema: loginSchema,
    handler: authController.login,
  },
  {
    method: "GET",
    url: `/auth/verifyEmail`,
    schema: verifyEmailSchema,
    handler: authController.verifyEmail,
  },
];

module.exports = routes;
