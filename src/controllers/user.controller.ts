import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/user.service";
import RequestAuth from "../types/Request";
import postService from "src/services/post.service";

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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
  } catch (error) {
    next(error);
  }
};

export const getUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await UserService.findUserBy("username", username);

    if (!user) {
      const error = new Error("Username not found");
      error.name = "NotFound";
      throw error;
    }

    return res.status(200).json({
      message: "User with " + username + " success retrieved.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await UserService.findUserBy("username", username);
    if (!user) {
      const error = new Error("Username not found");
      error.name = "NotFound";
      throw error;
    }

    const posts = await postService.getPosts({
      userId: user.id,
    });

    return res.status(200).json({
      message: "Post data success retrieved.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postUser,
  getUser,
  getUsername,
  getUserPost,
};
