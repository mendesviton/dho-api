import Joi from "joi";

export const changePasswordSchema = Joi.object({
  password: Joi.string().required().trim(),
});
