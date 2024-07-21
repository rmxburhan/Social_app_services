import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/user.service";
import RequestAuth from "../types/Request";

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error();
      error.name = "ValidationError";
      error.message = errors.array()[0].msg;
      next(error);
      return;
    }

    const registerInput: {
      username: string;
      password: string;
      email: string;
      name: string;
    } = req.body;

    let user = await UserService.findUserBy("username", registerInput.username);

    if (user) {
      const error = new Error();
      error.name = "BadRequest";
      error.message = "Username already taken, try another username.";
      next(error);
      return;
    }

    user = await UserService.findUserBy("email", registerInput.email);

    if (user) {
      const error = new Error();
      error.name = "BadRequest";
      error.message = "Email already taken, try another email.";
      next(error);
      return;
    }

    const newUser = UserService.createUser(registerInput);
    await newUser.hashPassword();
    try {
      await UserService.saveUser(newUser);

      return res.status(200).json({
        message: "Register success",
      });
    } catch (error: any) {
      error.message = "Create user failed" + error.message;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as RequestAuth).user;
    return res.status(200).json({
      message: "User info successfully received.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postUser,
  getUser,
};
