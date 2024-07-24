import { Types, isValidObjectId } from "mongoose";

export const castObjectId = (str: string) => new Types.ObjectId(str);

export const validObjectId = (str: string, errorMessage: string) => {
  if (Types.ObjectId.isValid(str)) {
    const error = new Error(errorMessage);
    error.name = "BadRequest";
    throw error;
  }
};
