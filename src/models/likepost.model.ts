import { Document, Schema, model } from "mongoose";

export interface LikePostDocument extends Document {
  postId: typeof Schema.Types.ObjectId;
  userId: typeof Schema.Types.ObjectId;
  createdAt: Date;
}

const likePostSchema = new Schema<LikePostDocument>({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const LikePost = model<LikePostDocument>("LikePost", likePostSchema);
export default LikePost;
