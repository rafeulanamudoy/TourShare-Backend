import { Schema, model } from "mongoose";
import { IUser, IUserExistReturn, UserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

import { UserRole } from "./users.const";

const userSchema = new Schema<IUser, UserModel>(
  {
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
      index: true,
      unique: true,
    },
    role: {
      type: String,
      enum: UserRole,
    },
    phoneNumber: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    profileImage: {
      url: {
        type: String,
        requird: true,
      },
      public_id: {
        type: String,
        requird: true,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUserExistReturn | null> {
  return await User.findOne({ email }, { _id: 1, email: 1, password: 1 });
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
