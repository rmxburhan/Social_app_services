import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/user.service";
const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(regex);
};
export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.name = "ValidationError";
      error.message = errors.array()[0].msg;
      next(error);
      return;
    }
    const loginInput: { username: string; password: string } = req.body;

    const isEmail = validateEmail(loginInput.username);
    let user = await UserService.findUserBy(
      isEmail ? "email" : "username",
      loginInput.username
    );

    if (!user) {
      const error = new Error();
      error.message = `${isEmail ? "Email" : "Username"} is not registered.`;
      error.name = "NotFound";
      next(error);
      return;
    }

    if (user) {
      const isMatch = user.comparePassword(loginInput.password);
      // TODO : create token
      if (!isMatch) {
        const error = new Error();
        error.name = "BadRequest";
        error.message = "Password is incorrect.";
        next(error);
        return;
      }
      console.log(isMatch);

      return res.status(200).json({
        token: "",
        message: "Login success",
        data: user.id,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  postLogin,
};
