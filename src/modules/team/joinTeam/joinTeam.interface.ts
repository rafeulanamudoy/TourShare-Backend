import { Types } from "mongoose";

export type IJoinTeam = {
  phoneNumber: string;
  email: string;
  address: string;

  groupMember: number;

  nationalIdNumber: string;
  teamInfo: Types.ObjectId;
};
