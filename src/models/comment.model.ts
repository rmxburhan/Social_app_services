import { Document, Schema, model } from "mongoose";

export interface CommentDocument extends Document {
  body: string;
  replyTo?: typeof Schema.Types.ObjectId;
  userId: typeof Schema.Types.ObjectId;
  postId: typeof Schema.Types.ObjectId;
  deletedAt?: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
    body: {
      type: String,
      required: true,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Coment",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export const Comment = model<CommentDocument>("Comment", commentSchema);

export default Comment;
