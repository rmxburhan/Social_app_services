import { Model, Schema, model, Document } from "mongoose";

export interface PostDocument extends Document {
  userId: typeof Schema.Types.ObjectId;
  caption: string;
  image?: string[];
  tags?: (typeof Schema.Types.ObjectId)[];
  deletedAt?: Date;
}

export interface PostQuery {
  userId?: any;
  caption?: any;
  image?: any;
  tags?: any;
  deletedAt?: string | undefined;
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
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export const Post: Model<PostDocument> = model<PostDocument>(
  "Post",
  postSchema
);

export default Post;
