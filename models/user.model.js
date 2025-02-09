import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      // ARRAY SINCE WILL STORE THE POST IDS
      type: [String],
      // WHEN CREATE <NEW></NEW> USER HAVE NO SAVED POSTS
      default: [],
    },
  },
  // WHEN NEW USER CREATED AUTOMATICALLY CREATE AT AND UPDATE AT
  { timestamps: true }
);

// COLLECTION NAME: USERS
export default mongoose.model("User", userSchema);
