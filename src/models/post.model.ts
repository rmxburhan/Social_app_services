import { Model, Schema, model, Document, Types } from "mongoose";

export interface PostDocument extends Document {
  userId: typeof Schema.Types.ObjectId;
  caption: string;
  image?: string[];
  tags?: (typeof Schema.Types.ObjectId)[];
  likes: [Types.ObjectId];
}

export interface PostQuery {
  userId?: any;
  caption?: any;
  image?: any;
  tags?: any;
}
const postSchema = new Schema<PostDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    caption: {
      type: String,
      required: true,
      max: 1024,
    },
    image: {
      type: [String],
      default: [],
    },
    tags: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    likes: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("totalLike").get(function (this: PostDocument) {
  return this.likes.length;
});

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

export const Post: Model<PostDocument> = model<PostDocument>(
  "Post",
  postSchema
);

export default Post;
