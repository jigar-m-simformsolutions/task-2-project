import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  emailVerified: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const User =
  (mongoose.models && mongoose.models.users) ||
  mongoose.model("users", userSchema);

export default User;
