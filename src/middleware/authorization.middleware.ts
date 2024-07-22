import { NextFunction, Request, Response } from "express";
import { errorHandlers } from "./errror-handler.middleware";
import tokenService from "../services/token.service";
import { findUserById } from "src/services/user.service";
import RequestAuth from "src/types/Request";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      const error = new Error("token is empty");
      error.name = "Authorization";
      throw error;
    }

    token = token.split(" ")[1];

    const verify = tokenService.verifyToken(token);
    if (!verify) {
      const error = new Error("token is invalid");
      error.name = "Auhorization";
      throw error;
    }

    const decoded: any = tokenService.decodeToken(token);
    console.log("Decoded jwt", decoded);
    const user = await findUserById(decoded.id);
    if (!user) {
      const error = new Error("user is invalid");
      error.name = "Authorization";
      throw error;
    }
    (req as RequestAuth).user = user;
    next();
  } catch (error: any) {
    errorHandlers(error, req, res, next);
  }
};

export default authorize;
