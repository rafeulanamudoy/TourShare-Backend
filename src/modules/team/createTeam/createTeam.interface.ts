import mongoose, { Types } from "mongoose";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";
export type ITeamDetails = {
  description: string;
  meetingPoint: string;
  meetingDate: Date;
  meetingTime: string;

  accommodations: string;
  transportation: string;
  activities?: { activity: string }[];
  costBreakdown: string;
  responsibilities?: { responsibility: string }[];
};
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
  joinPeople: IJoinPerson[];
  teamStatus: ENUM_TEAM_STATUS;
  budget: number;
  teamName: string;
  teamDetails: ITeamDetails;
};
export type ITeamStatus = "ongoing" | "closed";

export type IAccept = {
  members: number;
  joinTeamId: mongoose.Types.ObjectId;
  status: ENUM_jOIN_TEAM_STATUS;
};

export type IJoinPerson = {
  _id: mongoose.Types.ObjectId;
  joinTeamId: mongoose.Types.ObjectId;
  status: ENUM_jOIN_TEAM_STATUS;
};
export type ITransportation = "bus" | "airplane" | "train";
