import { UserDocument } from "src/models/user.model";
import jwt from "jsonwebtoken";

export const generateToken = (user: UserDocument) =>
  jwt.sign(user, process.env.JWT_SECRET || "test", {
    expiresIn: process.env.JWT_LIFETIME || "1h",
    issuer: process.env.JWT_ISSUER || "rmxburhan",
  });
export const verifyToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET || "test", {
    issuer: process.env.JWT_ISSUER || "rmxburhan",
  });

export const decodeToken = (token: string) => jwt.decode(token);

// const invalidateToken = (token: string) => {};

export default {
  generateToken,
  verifyToken,
  decodeToken,
};
