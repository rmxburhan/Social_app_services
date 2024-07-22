import { NextFunction, Request, Response } from "express";
import CommentService from "../services/comment.service";
import PostService from "../services/post.service";
import RequestAuth from "../types/Request";

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const comment = await CommentService.getCommentById(id);
    if (!comment) {
      throw (new Error("Comment id you search is not exist").name = "NotFound");
    }

    return res.status(200).json({
      message: "Comment success retrieved",
      data: comment,
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
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async () => {};

export default {
  getComment,
  postComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
