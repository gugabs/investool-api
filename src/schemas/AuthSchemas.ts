import joi from "joi";

export const signUpSchema = joi.object({
  firstName: joi.string().min(2).max(256).required(),
  surname: joi.string().min(2).max(256).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(256).required(), // need to add a strong password pattern
  repeatPassword: joi.ref("password"),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(256).required(),
});

export const activateAccountSchema = joi.object({
  code: joi.string().required(), // need to add uuid pattern
});

export const requestPasswordResetSchema = joi.object({
  email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
  code: joi.string().required(),
  newPassword: joi.string().min(6).max(256).required(),
});
