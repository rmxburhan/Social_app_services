import Follow, { FollowDocument } from "../models/follow.model";

export const createFollow = ({
  followingId,
  followerId,
}: {
  followingId: string;
  followerId: string;
}) => {
  return new Follow({
    followerId,
    followingId,
  });
};

export const deleteFollow = async (id: string) =>
  await Follow.findByIdAndDelete(id);

export const saveFollow = async (follow: FollowDocument) => await follow.save();

export const findFollow = async ({
  followerId,
  followingId,
}: {
  followingId: string;
  followerId: string;
}) => await Follow.findOne({ followingId, followerId });

export const findFollowBy = async (prop: string, value: string) =>
  await Follow.findOne({ [prop]: value });

export const getFollowers = async (
  userId: string
): Promise<FollowDocument[]> => {
  const followers = await Follow.find({
    followingId: userId,
  })
    .populate({ path: "followerId", select: "name username -_id" })
    .select("followerId");

  return followers;
};

export const getFollowing = async (userId: string) => {
  const followingDatas = await Follow.find({
    followerId: userId,
  })
    .populate({ path: "followingId", select: "name username -_id" })
    .select("followingId");

  return followingDatas;
};

export default {
  createFollow,
  saveFollow,
  deleteFollow,
  findFollow,
  findFollowBy,
  getFollowers,
  getFollowing,
};
