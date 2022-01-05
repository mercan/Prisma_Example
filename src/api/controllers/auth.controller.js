const UserService = require("../../services/user");

// User Validation
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../../validation/user.schema");

const register = async (req, res) => {
  const { error, value: user } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      statusCode: 400,
      message: error.details[0].message,
    });
  }

  const result = await UserService.register(user);

  if (result.error) {
    return res.status(409).send({
      statusCode: 409,
      message: result.error,
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: result.message,
    token: result.token,
  });
};

const login = async (req, res) => {
  const { error, value: user } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      statusCode: 400,
      message: error.details[0].message,
    });
  }

  const result = await UserService.login(user);

  if (result.error) {
    return res.status(400).send({
      statusCode: 400,
      message: result.error,
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: result.message,
    token: result.token,
  });
};

const verifyEmail = async (req, res) => {
  const emailVerificationCode = req.query.code;

  if (!emailVerificationCode) {
    return res.status(400).send({
      statusCode: 400,
      message: "Code is required.",
    });
  }

  const [email] = emailVerificationCode.split(":");

  if (!email) {
    return res.status(400).send({
      statusCode: 400,
      message: "Code is invalid.",
    });
  }

  const result = await UserService.verifyEmail(email, emailVerificationCode);

  if (result.error) {
    return res.status(400).send({
      statusCode: 400,
      message: result.error,
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: result.message,
  });
};

const changePassword = async (req, res) => {
  const { error, value: user } = changePasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      statusCode: 400,
      message: error.details[0].message,
    });
  }

  const result = await UserService.changePassword(
    req.user.id,
    user.currentPassword,
    user.password
  );

  if (result.error) {
    return res.status(400).send({
      statusCode: 400,
      message: result.error,
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: result.message,
  });
};

module.exports = {
  register,
  login,
  verifyEmail,
  changePassword,
};
