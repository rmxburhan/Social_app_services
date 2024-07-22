import { NextFunction, Request, Response } from "express";
import RequestAuth from "../types/Request";
import PostService from "../services/post.service";
import { SchemaTypes } from "mongoose";

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

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const { id } = req.params;

    await PostService.deleteMyPost(id, user.id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const { id } = req.params;
    const updateInput: {
      caption?: string;
      tags: (typeof SchemaTypes.ObjectId)[];
    } = req.body;
    const post = await PostService.getPostById(id);

    if (post.id !== user.id) {
      throw (new Error("You cannot update another user post").name =
        "Forbidden");
    }

    await PostService.updatePost(updateInput, post);
    return res.status(200).json({
      message: "Update post success.",
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);

    return res.status(200).json({
      message: "Post data succes retrieved.",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await PostService.getPosts();
    return res.status(200).json({
      message: "Posts data succes retrieved",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;
    const like = await PostService.likePost(id, user.id);
    return res.status(201).json({
      message: "Like post success",
    });
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;
    const like = await PostService.unlikePost(id, user.id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  postPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
};
