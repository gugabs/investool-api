import { Router } from "express";

import validateSchema from "@middlewares/validateSchema";

import AuthController from "@controllers/AuthController";

import { signUpSchema, signInSchema } from "@schemas/AuthSchemas";

const router = Router();

router.post("/sign-up", validateSchema(signUpSchema), AuthController.signUp);
router.post("/sign-in", validateSchema(signInSchema), AuthController.signIn);

export default router;
