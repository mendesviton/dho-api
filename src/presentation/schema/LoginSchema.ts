import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().allow(null).trim(),
  cpf: Joi.number().allow(null).positive().required(),
  password: Joi.string().required().trim(),
});
