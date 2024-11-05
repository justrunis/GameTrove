import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/user";
import { AuthRequest } from "../middleware/is-auth";
import { validateUserFields, checkUserExists } from "../util/validation";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const perPage = 3;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * perPage;
    const limit = perPage;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const { username, email, role } = req.body;

    // Validate user fields
    validateUserFields(req, res, async () => {
      try {
        // Check if another user with the same email or username exists
        await checkUserExists(userId, email, username);

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { username, email, role },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res
          .status(200)
          .json({ message: "User updated successfully", updatedUser });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
