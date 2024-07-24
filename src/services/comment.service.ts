import Comment, { CommentDocument } from "../models/comment.model";
import { Types } from "mongoose";

export const getComments = async (postId: string) =>
  await Comment.find({ postId: postId });

export const createComment = ({
  body,
  userId,
  postId,
  replyTo,
}: {
  body: string;
  userId: string;
  postId?: string;
  replyTo?: string;
}) =>
  new Comment({
    body,
    userId,
    postId,
    replyTo,
  });

export const saveComment = async (data: CommentDocument) => await data.save();

export const deleteComment = async (id: string, userId: string) => {
  const comment = await getCommentById(id);
  if (!comment) {
    const error = new Error("Comment not found.");
    error.name = "NotFound";
    throw error;
  }
  if (comment.userId.toString() !== userId) {
    const error = new Error("You cannot delete another person comment");
    error.name = "Forbidden";
    throw error;
  }
  return await Comment.deleteMany({
    $or: [{ replyTo: comment.id }, { _id: comment.id }],
  });
};

export const getCommentById = async (id: string) => await Comment.findById(id);

export const updateComment = async (
  commentId: string,
  userId: string,
  body: string
): Promise<CommentDocument> => {
  const comment = await getCommentById(commentId);

  if (!comment) {
    const error = new Error("Comment is not found");
    error.name = "NotFound";
    throw error;
  }

  if (comment.userId.toString() !== userId) {
    const error = new Error("You cannot edit another user comment");
    error.name = "Forbidden";
    throw error;
  }

  comment.body = body;
  return await comment.save();
};

export const getCommentBy = async (prop: string, value: string) =>
  await Comment.find({ [prop]: value });

export const replyComment = async ({
  body,
  userId,
  replyTo,
}: {
  body: string;
  userId: string;
  replyTo: string;
}) => {
  const comment = await getCommentById(replyTo);
  if (!comment) {
    const error = new Error("Comment not found");
    error.name = "NotFound";
    throw error;
  }

  const newComment = createComment({
    body,
    userId,
    replyTo: comment.id,
  });

  return await saveComment(newComment);
};

export const likeComment = async (commentId: string, userId: string) =>
  await Comment.findByIdAndUpdate(commentId, {
    $addToSet: { likes: new Types.ObjectId(userId) },
  });

export const unlikeComment = async (commentId: string, userId: string) =>
  await Comment.findByIdAndUpdate(commentId, {
    $pull: { likes: new Types.ObjectId(userId) },
  });

export default {
  getComments,
  createComment,
  saveComment,
  deleteComment,
  updateComment,
  getCommentById,
  replyComment,
  getCommentBy,
  likeComment,
  unlikeComment,
};
