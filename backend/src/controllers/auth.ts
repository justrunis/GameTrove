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
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (password !== confirmPassword) {
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Invalid email or password." });
      return;
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      res.status(404).json({ message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiryTime }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};
