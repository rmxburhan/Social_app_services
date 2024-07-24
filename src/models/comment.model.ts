import { Document, Schema, Types, model } from "mongoose";

export interface CommentDocument extends Document {
  body: string;
  replyTo?: Types.ObjectId;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  likes: [Types.ObjectId];
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
      ref: "Comment",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

commentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "replyTo",
});

export const Comment = model<CommentDocument>("Comment", commentSchema);

export default Comment;
