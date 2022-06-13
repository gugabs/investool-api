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
  "/activate-account/:code",
  validateSchema(activateAccountSchema),
  AuthController.activateAccount
);

router.post(
  "/request-password-reset",
  validateSchema(requestPasswordResetSchema),
  AuthController.requestPasswordReset
);

router.post(
  "/reset-password/:code",
  validateSchema(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
