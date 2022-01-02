const Joi = require("joi");

const options = {
  stripUnknown: false,
  convert: true,
  allowUnknown: true,
};

const registerSchema = Joi.object()
  .keys({
    firstName: Joi.string().required().min(3).max(200).messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name must be at most 200 characters long",
      "any.required": "First name is required",
    }),

    lastName: Joi.string().required().min(3).max(200).messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name must be at most 200 characters long",
      "any.required": "Last name is required",
    }),

    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .email()
      .max(200)
      .messages({
        "string.max": "Email must be 200 characters or less.",
        "string.email": "Please enter a valid email address.",
        "string.empty": "Please enter your email address.",
        "any.required": "Please enter your email address.",
      }),

    password: Joi.string().required().min(6).max(200).messages({
      "string.min": "Please enter a password with at least 6 characters.",
      "string.max": "Please enter a password with at most 200 characters.",
      "string.empty": "Please enter your password.",
      "any.required": "Please enter your password.",
    }),
  })
  .required()
  .options(options)
  .messages({
    "object.base": "Please fill out all required fields.",
  });

const loginSchema = Joi.object()
  .keys({
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .email()
      .max(200)
      .messages({
        "string.max": "Email must be 200 characters or less.",
        "string.email": "Please enter a valid email address.",
        "string.empty": "Please enter your email address.",
        "any.required": "Please enter your email address.",
      }),

    password: Joi.string().required().min(6).max(200).messages({
      "string.min": "Please enter a password with at least 6 characters.",
      "string.max": "Please enter a password with at most 200 characters.",
      "string.empty": "Please enter your password.",
      "any.required": "Please enter your password.",
    }),
  })
  .required()
  .options(options)
  .messages({
    "object.base": "Please fill out all required fields.",
  });

module.exports = { registerSchema, loginSchema };
