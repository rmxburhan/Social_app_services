import { Document, Schema, model } from "mongoose";

export interface LikeCommentDocument extends Document {
  commentId: typeof Schema.Types.ObjectId;
  userId: typeof Schema.Types.ObjectId;
  createdAt: Date;
}

const likeCommentSchema = new Schema<LikeCommentDocument>({
  commentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Comment",
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

export const LikeComment = model<LikeCommentDocument>(
  "LikeComment",
  likeCommentSchema
);
export default LikeComment;
