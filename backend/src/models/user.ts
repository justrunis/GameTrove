import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string; // Email of the user
  password: string; // Password of the user
  username: string; // Username of the user
  role: string; // Role of the user
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Email of the user
  password: { type: String, required: true }, // Password of the user
  username: { type: String, required: true }, // Username of the user
  role: { type: String, required: true, default: "user" }, // Role of the user
});

UserSchema.set("timestamps", true);

export default mongoose.model<IUser>("User", UserSchema);
