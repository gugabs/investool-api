import { Router } from "express";

import validateSchema from "@middlewares/validateSchema";

import AuthController from "@controllers/AuthController";

import {
  signUpSchema,
  signInSchema,
  activateAccountSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "@schemas/AuthSchemas";

const router = Router();

router.post("/sign-up", validateSchema(signUpSchema), AuthController.signUp);
router.post("/sign-in", validateSchema(signInSchema), AuthController.signIn);

router.post(
  "/activate-account",
  validateSchema(activateAccountSchema),
  AuthController.activateAccount
);

router.post(
  "/request-password-reset",
  validateSchema(requestPasswordResetSchema),
  AuthController.requestPasswordReset
);

router.post("/reset-password", validateSchema(resetPasswordSchema), AuthController.resetPassword);

export default router;
