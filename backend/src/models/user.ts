import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  role: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

export default mongoose.model<IUser>("User", UserSchema);
