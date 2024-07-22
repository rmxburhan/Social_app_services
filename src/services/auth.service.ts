import { UserDocument } from "../models/user.model";
import { validateEmail } from "../validator/auth.validator";
import UserService from "./user.service";
import TokenService from "./token.service";

interface CredentialData {
  user: UserDocument;
  token: string;
}

export const verifyCredentials = async (
  loginInput: Pick<UserDocument, "username" | "password">
): Promise<CredentialData | null> => {
  let key = validateEmail(loginInput.username) ? "email" : "username";

  let user = await UserService.findUserBy("email", loginInput.username);
  if (!user) {
    const error = new Error(`${key} is not registered.`);
    error.name = "NotFound";
    throw error;
  }

  const isMatch = user.comparePassword(loginInput.password);
  if (!isMatch) {
    const error = Error("Password is incorrect.");
    error.name = "BadRequest";
    throw error;
  }
  const token = TokenService.generateToken(user.toObject());

  return {
    token,
    user,
  };
};

export default {
  verifyCredentials,
};
