import { NextFunction, Request, Response } from "express";
import PostService from "../services/post.service";
import SaveService from "../services/save.service";
import RequestAuth from "../types/Request";

export const postSave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;

    const post = await PostService.getPostById(id);
    const exist = await SaveService.getSaveBy({
      postId: post.id,
      userId: user.id,
    });

    if (exist) {
      throw (new Error("Already saved").name = "BadRequest");
    }

    await SaveService.createSave({
      postId: post.id,
      userId: user.id,
    });
    return res.status(201).json({
      message: "Post has been saved",
    });
  } catch (error) {
    next(error);
  }
};

export const removeSave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;

    const post = await PostService.getPostById(id);
    await SaveService.deleteMySaved(post.id, user.id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getSaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const saves = await SaveService.getSaves({ userId: user.id });

    return res.status(200).json({
      message: "Saved post succes retrieved.",
      data: saves,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postSave,
  removeSave,
  getSaves,
};
