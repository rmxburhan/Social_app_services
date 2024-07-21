import { Model } from "mongoose";
import { UserDocument, User } from "../models/user.model";

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value });

export const findUserById = async (id: string) => await User.findById(id);

export const createUser = ({
  name,
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  name: string;
  password: string;
}) => new User({ username, password, email, name });

export const saveUser = async (user: UserDocument) => await user.save();

export default {
  findUserBy,
  findUserById,
  createUser,
  saveUser,
};
