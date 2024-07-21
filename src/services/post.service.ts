import Post, { PostDocument } from "src/models/post.model";

export const createPost = ({
  caption,
  tags,
}: {
  caption: string;
  tags: string[];
}) => new Post();

export const deletePost = async (id: string) =>
  await Post.findByIdAndDelete(id);

export const savePost = async (post: PostDocument) => await post.save();

export default {
  createPost,
  deletePost,
  savePost,
};
