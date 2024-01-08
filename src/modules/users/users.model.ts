import { Schema, model } from "mongoose";
import { IUser } from "./users.interface";

const userSchema = new Schema<IUser>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = model<IUser>("User", userSchema);
