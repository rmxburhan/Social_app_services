import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import AuthService from "../services/auth.service";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.name = "ValidationError";
      throw error;
    }
    const loginInput: { username: string; password: string } = req.body;
    const credentialsData = await AuthService.verifyCredentials(loginInput);

    return res.status(200).json({
      token: credentialsData?.token,
      data: credentialsData?.user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postLogin,
};
