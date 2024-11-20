import { Request, Response } from "express";
import User from "../models/user";
import UserGameProgress from "../models/userGameProgress";

export const getUserProgressInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const userProgress = await UserGameProgress.find({ user: userId });
    if (!userProgress) {
      res.status(404).json({ message: "User progress not found." });
      return;
    }

    res.status(200).json(userProgress);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const updateUserProgressInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const {
      game,
      hasBeaten,
      rating,
      review,
      playTime,
      startedAt,
      completedAt,
    } = req.body;

    console.log(req.body);

    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({ message: "User not found." });
      return;
    }

    if (review.length > 255) {
      res
        .status(402)
        .json({ message: "Review must be shorter than 255 symbols" });
    }

    const userProgress = await UserGameProgress.findOne({
      game: game,
      user: userId,
    });

    // if user progress does not exist, create a new one for that user
    if (!userProgress) {
      const newUserProgress = new UserGameProgress({
        user: userId,
        game: game,
        hasBeaten,
        rating,
        review,
        playTime,
        startedAt,
        completedAt,
      });
      await newUserProgress.save();
      res.status(201).json({
        message: "User progress created successfully.",
        userProgress: newUserProgress,
      });
      return;
    }
    // update the progress with new info (if some fields are empty or the same, keep the old values)
    if (req.body.hasOwnProperty("hasBeaten")) {
      userProgress.hasBeaten = hasBeaten;
    }
    if (req.body.hasOwnProperty("rating")) {
      userProgress.rating = rating;
    }
    if (req.body.hasOwnProperty("review")) {
      userProgress.review = review;
    }
    if (req.body.hasOwnProperty("playTime")) {
      userProgress.playTime = playTime;
    }
    if (req.body.hasOwnProperty("startedAt")) {
      userProgress.startedAt = startedAt;
    }
    if (req.body.hasOwnProperty("completedAt")) {
      userProgress.completedAt = completedAt;
    }

    await userProgress.save();
    res
      .status(200)
      .json({ message: "User progress updated successfully.", userProgress });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
    return;
  }
};
