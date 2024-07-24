import { NextFunction, Request, Response } from "express";
import CommentService from "../services/comment.service";
import PostService from "../services/post.service";
import RequestAuth from "../types/Request";
import { validationResult } from "express-validator";
import Comment from "../models/comment.model";

export const postComment = async (
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
    const { id } = req.params;
    const { body } = req.body;
    const user = (req as RequestAuth).user;
    const post = await PostService.getPostById(id);
    const comment = CommentService.createComment({
      body,
      postId: post.id,
      userId: user.id,
    });

    await CommentService.saveComment(comment);
    return res.status(201).json({
      message: "Comment has been posted",
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let comment = await CommentService.getCommentById(id);
    if (!comment) {
      const error = new Error("Comment id you search is not exist");
      error.name = "NotFound";
      throw error;
    }
    const populatedComent = await Comment.populate(comment, {
      path: "replies",
    });

    return res.status(200).json({
      message: "Comment success retrieved",
      data: populatedComent.toObject(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
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
    const { body }: { body: string } = req.body;
    const { id } = req.params;

    const comment = await CommentService.updateComment(id, user.id, body);
    return res.status(200).json({
      message: "Update comment success",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const { id } = req.params;
    await CommentService.deleteComment(id, user.id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const replyComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const user = (req as RequestAuth).user;
    await CommentService.replyComment({
      body,
      replyTo: id,
      userId: user.id,
    });
    return res.status(201).json({
      message: "Reply comment success",
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;
    const like = await CommentService.likeComment(id, user.id);
    if (!like) {
      const error = new Error("Like comment failed");
      error.name = "BadRequest";
      throw error;
    }
    return res.status(201).json({
      message: "like comment success",
    });
  } catch (error) {
    next(error);
  }
};

export const unlikeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as RequestAuth).user;
    const like = await CommentService.unlikeComment(id, user.id);
    if (!like) {
      const error = new Error("Like comment failed");
      error.name = "BadRequest";
      throw error;
    }
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    const comments = await CommentService.getComments(post.id);
    return res.status(200).json({
      message: "Retrieve comments from post " + id + " success.",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getComment,
  postComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  getComments,
  replyComment,
};
