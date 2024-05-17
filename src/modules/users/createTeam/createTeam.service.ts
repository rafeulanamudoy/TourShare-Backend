import { ICreateTeam } from "./createTeam.interface";
import { CreateTeam } from "./createTeam.model";

const createTeam = async (payload: ICreateTeam) => {
  const result = await CreateTeam.create(payload);
  return result;
};
const getTeams = async () => {
  const result = await CreateTeam.find({});
  return result;
};
export const CreateTeamService = {
  createTeam,
  getTeams,
};
