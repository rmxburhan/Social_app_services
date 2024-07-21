import { Router } from "express";
import { validateRegisterInput } from "..//validator/user.validator";
import UserController from "../controllers/user.controller";
const router = Router();

router.get("/", UserController.getUser);

router.post("/register", validateRegisterInput(), UserController.postUser);

// router.post("/register/cancel");

export default router;
