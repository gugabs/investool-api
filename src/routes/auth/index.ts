import { Router } from "express";

import validateSchema from "@/middlewares/validateSchema";

import AuthController from "@/controllers/AuthController";

import { signUpSchema } from "@/schemas/AuthSchemas";

const router = Router();

router.post("/sign-up", validateSchema(signUpSchema), AuthController.signUp);

export default router;
