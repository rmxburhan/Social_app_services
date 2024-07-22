import { Document, Model, Schema, model } from "mongoose";

export interface SaveDocument extends Document {
  postId: typeof Schema.Types.ObjectId;
  userId: typeof Schema.Types.ObjectId;
  createdAt: Date;
}

export interface SaveQuery {
  postId?: string;
  userId?: string;
}

const saveSchema = new Schema({
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

const Save: Model<SaveDocument> = model<SaveDocument>("Save", saveSchema);

export default Save;
