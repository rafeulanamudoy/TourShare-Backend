import { Types } from "mongoose";

export type ICreateTeam = {
  phoneNumber: string;
  email: string;
  address: string;
  destination: string;

  currentMembers: number;
  neededMembers: number;

  nationalIdNumber: string;
  startDate: Date;
  endDate: Date;
  joinPeople: Types.ObjectId[];
};
