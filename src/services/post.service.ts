import { SchemaTypes, Types } from "mongoose";
import Post, { PostDocument, PostQuery } from "../models/post.model";
import { existsSync, unlinkSync } from "fs";
import path from "path";

export const getPosts = async (
  query: PostQuery = {}
): Promise<PostDocument[]> => {
  const posts = await Post.find(query).sort({ createdAt: -1 });
  return posts;
};

export const getPostBy = async (query: PostQuery): Promise<PostDocument> => {
  const post = await Post.findOne(query);
  if (!post) {
    const error = new Error("Post not found");
    error.name = "NotFound";
    throw error;
  }
  return post;
};

export const getPostById = async (id: string): Promise<PostDocument> => {
  const post = await Post.findById(id);
  if (!post) {
    const error = new Error("Post not found.");
    error.name = "NotFound";
    throw error;
  }
  return post;
};

export const updatePost = async (
  query: {
    caption?: string;
    tags?: (typeof SchemaTypes.ObjectId)[];
  },
  post: PostDocument
): Promise<PostDocument | null> => await Post.findByIdAndUpdate(post.id, query);

export const savePost = async (post: PostDocument) => await post.save();

export const createPost = ({
  caption,
  tags,
  userId,
}: {
  caption: string;
  tags?: string[];
  userId: string;
}) =>
  new Post({
    caption,
    tags,
    userId,
  });

export const deleteMyPost = async (id: string, userId: string) => {
  const post = await getPostById(id);

  if (post.userId.toString() !== userId) {
    const error = new Error("You cannot delete another person post");
    error.name = "Forbidden";
    throw error;
  }
  post.image?.forEach((item) => {
    const pathFile = path.join(process.cwd(), item);
    if (existsSync(pathFile)) {
      unlinkSync(path.join(process.cwd(), item));
    }
  });

  return await Post.findByIdAndDelete(post.id);
};

export const likePost = async (
  postId: string,
  userId: string
): Promise<PostDocument | null> => {
  // const post = await getPostById(postId);
  // if (post.likes.includes(new Types.ObjectId(userId))) {
  //   const error = new Error();
  //   error.name = "BadRequest";
  //   throw error;
  // }
  // post.likes.push(new Types.ObjectId(userId));
  // return await post.save();
  return await Post.findByIdAndUpdate(postId, {
    $addToSet: { likes: new Types.ObjectId(userId) },
  });
};

export const unlikePost = async (postId: string, userId: string) =>
  await Post.findByIdAndUpdate(postId, {
    $pull: { likes: userId },
  });

export default {
  createPost,
  savePost,
  getPostBy,
  getPostById,
  getPosts,
  updatePost,
  deleteMyPost,
  likePost,
  unlikePost,
};
