import { IJoinTeamStatus } from "../joinTeam/joinTeam.interface";
import { ITeamStatus } from "./createTeam.interface";

export const TeamStatus: ITeamStatus[] = ["ongoing", "closed"];
export const JoinTeamStatus: IJoinTeamStatus[] = [
  "accepted",
  "notAccepted",
  "pending",
];
