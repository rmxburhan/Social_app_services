import dayjs from "dayjs";
import Comment, { CommentDocument } from "../models/comment.model";
import LikeComment from "../models/likecomment.model";
import likecommentService from "./likecomment.service";

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

  comment.deletedAt = dayjs().toDate();
  await Comment.updateMany(
    { replyTo: comment.id },
    { deletedAt: dayjs().toDate() }
  );
  await comment.save();
};

export const getCommentById = async (id: string) =>
  await Comment.findOne({ _id: id, deletedAt: undefined });

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
  await Comment.find({ [prop]: value, deletedAt: undefined });

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

export const likeComment = async (commentId: string, userId: string) => {
  const comment = await getCommentById(commentId);

  if (!comment) {
    const error = new Error("Comment not found");
    error.name = "NotFound";
    throw error;
  }

  const like = await likecommentService.getLikeComment(userId, comment.id);

  if (like) {
    const error = new Error(
      "You are already like this post. you cannot do it twice"
    );
    error.name = "BadRequest";
    throw error;
  }

  const newLike = new LikeComment({
    commentId: comment.id,
    userId,
    createdAt: dayjs().toDate(),
  });

  await newLike.save();
  return newLike;
};

export const unlikeComment = async (commentId: string, userId: string) => {
  const like = await likecommentService.getLikeComment(userId, commentId);
  if (!like) {
    const error = new Error("You are not like the post.");
    error.name = "BadRequest";
    throw error;
  }

  await likecommentService.deletLikeComment(like.id);
};

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
