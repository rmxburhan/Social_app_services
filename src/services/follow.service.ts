import Follow, { FollowDocument } from "src/models/follow.model";

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

export default {
  createFollow,
  saveFollow,
  deleteFollow,
  findFollow,
  findFollowBy,
};
