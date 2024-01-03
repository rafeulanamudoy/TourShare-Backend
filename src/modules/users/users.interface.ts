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
