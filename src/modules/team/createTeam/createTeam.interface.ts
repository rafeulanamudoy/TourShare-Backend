import mongoose, { Types } from "mongoose";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";

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
  teamStatus: ENUM_TEAM_STATUS;
};
export type ITeamStatus = "ongoing" | "closed";

export type IAccept = {
  members: number;
  joinTeamId: mongoose.ObjectId;
  status: ENUM_jOIN_TEAM_STATUS;
};
