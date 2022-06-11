import joi from "joi";

export const signUpSchema = joi.object({
  firstName: joi.string().min(2).max(256).required(),
  surname: joi.string().min(2).max(256).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(256).required(),
  repeatPassword: joi.ref("password"),
});
