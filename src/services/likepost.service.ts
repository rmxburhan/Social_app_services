import LikePost, { LikePostDocument } from "../models/likepost.model";

export const getLikeById = async (id: string) => {
  const like = await LikePost.findOne({ _id: id });

  if (!like) {
    throw (new Error("Like id not found").name = "NotFound");
  }
  return like;
};

export const getLikesBy = async (prop: string, value: string) =>
  await LikePost.find({ [prop]: value });

export default {
  getLikeById,
  getLikesBy,
};
