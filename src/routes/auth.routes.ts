import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validatorLoginInput } from "../validator/auth.validator";
const router = Router();

/**
 * Visibility : Public
 * Login
 * @property username
 * @property password
 * Success : 200
 * Error : 401, 400, 500
 */
router.post("/login", validatorLoginInput, AuthController.postLogin);

export default router;
