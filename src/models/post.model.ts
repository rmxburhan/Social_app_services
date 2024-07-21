import { Model, Schema, model, Document } from "mongoose";

export interface PostDocument extends Document {
  userId: typeof Schema.Types.ObjectId;
  caption: string;
  image: string[];
  tags: (typeof Schema.Types.ObjectId)[];
}

const postSchema = new Schema<PostDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    caption: {
      type: String,
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
  },
  { timestamps: true }
);

export const Post: Model<PostDocument> = model<PostDocument>(
  "Post",
  postSchema
);

export default Post;
