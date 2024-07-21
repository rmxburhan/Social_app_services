import { NextFunction, Request, Response } from "express";

export const errorHandlers = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
