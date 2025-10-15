import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      data: err.data,
      message: err.message,
      success: err.success,
      errors: err.errors,
    });
  }

  res.status(500).json({
    statusCode: 500,
    message: "Something went wrong",
    success: false,
  });
};
