import User from "../models/user";
import Friend from "../models/friend";
import UserGameProgress from "../models/userGameProgress";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/is-auth";

export const getFriends = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    const friends = await Friend.find({ user: userId }).populate("friend");

    res.status(200).json({ friends });
  } catch (error) {
    if (error instanceof Error) {
      if (!("statusCode" in error)) {
        (error as any).statusCode = 500;
      }
      next(error); // Forward the error to the next middleware
    } else {
      next(new Error("Unknown error occurred")); // Handle unknown errors
    }
  }
};
