import mongoose, { Schema, Document } from "mongoose";

export interface IUserGameProgress extends mongoose.Document {
  user: Schema.Types.ObjectId; // Reference to the user
  game: number; // Reference to the game
  hasBeaten: boolean; // Whether the user has beaten the game
  rating?: number; // Rating given by the user (optional)
  review?: string; // User's review or comments about the game (optional)
  playTime?: number; // Total playtime (in hours or minutes)
  startedAt?: Date; // When the user started playing the game
  completedAt?: Date; // When the user completed the game (if applicable)
}

const UserGameProgressSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  game: { type: Number, required: true },
  hasBeaten: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 10 }, // Example rating from 1 to 10
  review: { type: String, maxlength: 1000 },
  playTime: { type: Number }, // Total playtime in hours or minutes
  startedAt: { type: Date },
  completedAt: { type: Date },
});

UserGameProgressSchema.set("timestamps", true);

export default mongoose.model<IUserGameProgress>(
  "UserGameProgress",
  UserGameProgressSchema
);
