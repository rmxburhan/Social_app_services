import { NextFunction, Request, Response } from "express";
import RequestAuth from "../types/Request";
import PostService from "../services/post.service";
import { SchemaTypes } from "mongoose";
import { validationResult } from "express-validator";
import { unlinkSync } from "fs";
import path from "path";
import Post from "../models/post.model";

export const postPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.name = "BadRequest";
      throw error;
    }

    const user = (req as RequestAuth).user;
    const { caption, tags }: { caption: string; tags: string[] } = req.body;
    console.log(tags);
    const post = PostService.createPost({
      caption,
      tags,
      userId: user.id,
    });
    if (req.files) {
      let imagesPath: string[] = [];
      const images = req.files as Express.Multer.File[];
      images.forEach((item) => {
        imagesPath.push(item.path);
      });
      post.image = imagesPath;
    }

    await PostService.savePost(post);
    return res.status(201).json({
      message: "Post has been created",
      data: post,
    });
  } catch (error) {
    if (req.files) {
      const image = req.files as Express.Multer.File[];
      image.forEach((item) => {
        unlinkSync(path.join(process.cwd(), item.path));
      });
    }
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.name = "BadRequest";
      throw error;
    }

    const user = (req as RequestAuth).user;
    const { id } = req.params;

    const updateInput: {
      caption?: string;
      tags?: (typeof SchemaTypes.ObjectId)[];
    } = req.body;

    const post = await PostService.getPostById(id);

    if (post.userId.toString() !== user.id) {
      const error = new Error("You cannot update another user post");
      error.name = "Forbidden";
      throw error;
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
    return res.status(200).json({
      message: "Post has been unliked",
    });
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
  likePost,
  unlikePost,
};
