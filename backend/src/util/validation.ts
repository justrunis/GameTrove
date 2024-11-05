import { Request, Response, NextFunction } from "express";
import User from "../models/user";
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateEmail = (email: string): boolean => {
  if (!email || email.length > 254) return false;

  if (!emailRegex.test(email)) return false;

  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
};

export const validateUserFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, role } = req.body;

  // Check for empty fields
  if (!username || !email || !role) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if username, email, and role are strings with the required length
  if (typeof username !== "string" || username.length < 3) {
    return res.status(400).json({
      message: "Username must be a string of at least 3 characters",
    });
  }

  if (typeof email !== "string" || email.length < 5 || !validateEmail(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  if (typeof role !== "string" || (role !== "user" && role !== "admin")) {
    return res.status(400).json({
      message: "Role must be either 'user' or 'admin'",
    });
  }

  next();
};

export const checkUserExists = async (
  userId: string,
  email: string,
  username: string
) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
    _id: { $ne: userId }, // Exclude the current user
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already exists");
    }
    if (existingUser.username === username) {
      throw new Error("Username already exists");
    }
  }
};
