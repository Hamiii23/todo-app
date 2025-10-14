import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { User } from "../models/user.model.ts";
import type { NextFunction, Request, Response } from "express";

interface DecodedToken extends jwt.JwtPayload {
  _id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized Request");
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as DecodedToken;

      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken",
      );

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = user;

      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid Access Token");
    }
  },
);
