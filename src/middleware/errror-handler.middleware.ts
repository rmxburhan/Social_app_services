import { NextFunction, Request, Response } from "express";

export const errorHandlers = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    let code = 500;
    switch (error.name) {
      case "Auhorization":
        code = 401;
        break;
      case "BadRequest":
        code = 400;
        break;
      case "NotFound":
        code = 404;
        break;
      case "Forbidden":
        code = 403;
        break;
      default:
        code = 500;
        break;
    }
    return res.status(code).json({
      message: error.message,
    });
  }
};
