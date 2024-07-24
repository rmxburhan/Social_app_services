import { Document, Schema, model } from "mongoose";

export interface FollowDocument extends Document {
  followingId: typeof Schema.Types.ObjectId;
  followerId: typeof Schema.Types.ObjectId;
}

const followSchema = new Schema<FollowDocument>(
  {
    followingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Follow = model<FollowDocument>("Follow", followSchema);

export default Follow;
