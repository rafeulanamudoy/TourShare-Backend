import mongoose, { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";

export type IUser = {
  password: string;
  email: string;

  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  profileImage: {
    url: string;
    public_id: string;
  };
  role: ENUM_USER_ROLE;
};
export type IUserSignUpResponse = IUser & {
  accessToken: string;
  refreshToken: string;
};
export type IUserExistReturn = {
  _id: mongoose.Types.ObjectId;
  email: string;

  password: string;
  role: ENUM_USER_ROLE;
};

export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  refreshToken?: string;
  accessToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExistReturn, "email" | "password" | "_id" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
export type IUserRole = "customer" | "admin" | "superAdmin";
