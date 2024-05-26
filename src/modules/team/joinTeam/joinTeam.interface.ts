import { Types } from "mongoose";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";

export type IJoinTeam = {
  phoneNumber: string;
  email: string;
  address: string;

  groupMember: number;

  nationalIdNumber: string;
  teamInfo: Types.ObjectId;
  staus: ENUM_jOIN_TEAM_STATUS;
};
export type IJoinTeamStatus = "interested" | "notInterested";
