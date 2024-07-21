import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validatorLoginInput } from "../validator/auth.validator";
const router = Router();

router.post("/login", validatorLoginInput(), AuthController.postLogin);

export default router;
