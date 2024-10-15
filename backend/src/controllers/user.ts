import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/user";

type RequestBody = { text: string };

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
