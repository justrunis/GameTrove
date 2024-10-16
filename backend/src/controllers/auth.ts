import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";

const saltRounds = 12;
const tokenExpiryTime = "7d";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, passwordRepeat } = req.body;

    if (!username || !email || !password || !passwordRepeat) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (password !== passwordRepeat) {
      res.status(400).json({ message: "Passwords do not match." });
      return;
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400).json({ message: "Username or email already exists." });
      return;
    }

    const role: string = "user";
    const hashedPassword: string = await bcryptjs.hash(password, saltRounds);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "Invalid username or password." });
      return;
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      res.status(404).json({ message: "Invalid username or password." });
      return;
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiryTime }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const perPage = 10;
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
