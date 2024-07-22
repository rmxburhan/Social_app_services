import LikePost from "../models/likepost.model";

export const getLikePostById = async (id: string) => {
  const like = await LikePost.findOne({ _id: id });

  if (!like) {
    throw (new Error("Like id not found").name = "NotFound");
  }
  return like;
};

export const getLikePost = async (userId: string, postId: string) =>
  await LikePost.findOne({ userId, postId });

export const deleteLikePost = async (id: string) =>
  await LikePost.findByIdAndDelete(id);

export default {
  getLikePostById,
  deleteLikePost,
  getLikePost,
};
