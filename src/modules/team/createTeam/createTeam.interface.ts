import { Types } from "mongoose";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";

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
