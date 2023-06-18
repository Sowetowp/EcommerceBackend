import Joi from "joi"
import validateRequest from "./validate.js"

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPasswordError = "password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"

export const signup = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
      .required()
      .trim()
      .lowercase()
      .messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Email is a required field",
      }),
    storeName: Joi.string().required().trim().message({
      "string.empty": "storeName is a required field",
    }),
    password: Joi.string().regex(strongPasswordRegex).required().messages({
      "string.empty": "password is required",
      "string.pattern.base": stringPasswordError,
    }),
    country: Joi.string().required().trim(),
    state: Joi.string().required().trim(),
    phoneNumber: Joi.string().required().trim(),
    bankName: Joi.string().required().trim(),
    accountName: Joi.string().required().trim(),
    accountNumber: Joi.number().required().min(8),
  })
  validateRequest(req, next, schema)
}

export const signin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
      .required()
      .lowercase()
      .trim(),
    password: Joi.string().required().trim(),
  })
  validateRequest(req, next, schema)
}
