import { NextFunction, Request, Response } from "express";
import RequestAuth from "../types/Request";

export const postPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as RequestAuth).user;
    const postInput: {
      caption: string;
      tags: string[];
    } = req.body;
    // const image = req.file;
  } catch (error) {
    next(error);
  }
};

export default {
  postPost,
};
