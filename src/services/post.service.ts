import dayjs from "dayjs";
import { SchemaTypes } from "mongoose";
import Post, { PostDocument, PostQuery } from "../models/post.model";
import LikePost from "../models/likepost.model";
import likepostService, { getLikePost } from "./likepost.service";

export const getPosts = async (
  query: PostQuery = {}
): Promise<PostDocument[]> => {
  query.deletedAt = undefined;
  const posts = await Post.find({});
  return posts;
};

export const getPostBy = async (query: PostQuery): Promise<PostDocument> => {
  query.deletedAt = undefined;
  const post = await Post.findOne(query);
  if (!post) {
    throw (new Error("Post not found").name = "NotFound");
  }
  return post;
};

export const getPostById = async (id: string): Promise<PostDocument> => {
  const post = await Post.findOne({ _id: id, deletedAt: undefined });
  if (!post) {
    throw (new Error("Post not found.").name = "NotFound");
  }
  return post;
};

export const updatePost = async (
  {
    caption,
    tags,
  }: {
    caption?: string;
    tags?: (typeof SchemaTypes.ObjectId)[];
  },
  post: PostDocument
): Promise<PostDocument> => {
  if (caption) post.caption = caption;
  if (tags) post.tags = tags;
  await post.save();

  return post;
};

export const savePost = async (post: PostDocument) => await post.save();

export const createPost = ({
  caption,
  tags,
}: {
  caption: string;
  tags: string[];
}) => new Post();
getPostById;
export const deletePost = async (id: string) => {
  const post = await Post.findOne({ _id: id, deletedAt: undefined });

  if (!post) {
    throw (new Error("Post not found. Delete failed").name = "NotFound");
  }

  post.deletedAt = dayjs().toDate();
  await post.save();
};

export const deleteMyPost = async (
  id: string,
  userId: typeof SchemaTypes.ObjectId
) => {
  const post = await Post.findOne({ _id: id, deletedAt: undefined });

  if (!post) {
    throw (new Error("Post not found. Delete failed").name = "NotFound");
  }

  if (post.userId !== userId) {
    throw (new Error("You cannot delete another person post").name =
      "Forbidden");
  }

  post.deletedAt = dayjs().toDate();
  await post.save();
};

export const likePost = async (postId: string, userId: string) => {
  const post = await getPostById(postId);

  const like = await getLikePost(userId, postId);
  if (like) {
    throw (new Error("You had like the post").name = "BadRequest");
  }

  const newLike = new LikePost({
    postId: post.id,
    userId: userId,
    createdAt: dayjs().toDate(),
  });

  await newLike.save();
  return newLike;
};

export const unlikePost = async (postId: string, userId: string) => {
  const like = await likepostService.getLikePost(userId, postId);

  if (!like) {
    throw (new Error("You were had not like this post").name = "BadRequest");
  }

  await likepostService.deleteLikePost(like.id);
};

export default {
  createPost,
  deletePost,
  savePost,
  getPostBy,
  getPostById,
  getPosts,
  updatePost,
  deleteMyPost,
  likePost,
  unlikePost,
};
