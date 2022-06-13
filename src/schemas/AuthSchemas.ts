import joi from "joi";

export const signUpSchema = joi
  .object({
    body: {
      firstName: joi.string().min(2).max(256).required(),
      surname: joi.string().min(2).max(256).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(256).required(), // need to add a strong password pattern
      repeatPassword: joi.ref("password"),
    },
  })
  .unknown();

export const signInSchema = joi
  .object({
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(6).max(256).required(),
    },
  })
  .unknown();

export const activateAccountSchema = joi
  .object({
    params: { code: joi.string().min(10).required() }, // need to add uuid pattern,
  })
  .unknown();

export const requestPasswordResetSchema = joi
  .object({
    body: { email: joi.string().email().required() },
  })
  .unknown();

export const resetPasswordSchema = joi
  .object({
    params: { code: joi.string().min(10).required() }, // need to add uuid pattern
    body: { newPassword: joi.string().min(6).max(256).required() },
  })
  .unknown();
