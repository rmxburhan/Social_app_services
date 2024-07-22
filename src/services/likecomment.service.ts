import LikeComment, { LikeCommentDocument } from "../models/likecomment.model";

export const getLikeComment = async (
  userId: string,
  commentId: string
): Promise<LikeCommentDocument | null> => {
  const like = await LikeComment.findOne({ userId, commentId: commentId });
  return like;
};

export const deletLikeComment = async (id: string) =>
  await LikeComment.findByIdAndDelete(id);

export default {
  getLikeComment,
  deletLikeComment,
};
