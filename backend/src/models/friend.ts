import mongoose from "mongoose";

export interface IFriend extends mongoose.Document {
  user: string; // User ID of the friend
  friend: string; // User ID of the friend
  status: string; // Status of the friend request
}

const FriendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the friend
  friend: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the friend
  status: { type: String, required: true, default: "pending" }, // Status of the friend request
});
FriendSchema.set("timestamps", true);

export default mongoose.model<IFriend>("Friend", FriendSchema);
