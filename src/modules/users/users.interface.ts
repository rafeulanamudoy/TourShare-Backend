import mongoose, { Model } from "mongoose";

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  profileImage: string;
  password: string;
};
export type IUserExistReturn = {
  _id: mongoose.Types.ObjectId;
  email: string;

  password: string;
};
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExistReturn, "email" | "password" | "_id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
