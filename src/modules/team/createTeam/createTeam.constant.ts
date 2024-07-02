import { IJoinTeamStatus } from "../joinTeam/joinTeam.interface";
import { ITeamStatus, ITransportation } from "./createTeam.interface";

export const TeamStatus: ITeamStatus[] = ["ongoing", "closed"];
export const JoinTeamStatus: IJoinTeamStatus[] = [
  "accepted",
  "notAccepted",
  "pending",
];
export const transportation: ITransportation[] = ["airplane", "bus", "train"];
