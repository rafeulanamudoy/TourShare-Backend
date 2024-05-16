import { ICreateTeam } from "./createTeam.interface";
import { CreateTeam } from "./createTeam.model";

const createTeam = async (payload: ICreateTeam) => {
  const createTeam = await CreateTeam.create(payload);
  return createTeam;
};

export const CreateTeamService = {
  createTeam,
};
