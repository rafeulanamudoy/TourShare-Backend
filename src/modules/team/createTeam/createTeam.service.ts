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

const getSingleTeamByEmail = async (email: string) => {
  const result = await CreateTeam.findOne({ email: email }).populate(
    "joinPeople"
  );
  return result;
};
const getSingleTeamById = async (id: string) => {
  const result = await CreateTeam.findById(id);
  return result;
};
const updateSingleTeam = async (id: string, payload: Partial<ICreateTeam>) => {
  const result = await CreateTeam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const CreateTeamService = {
  createTeam,
  getTeams,
  getSingleTeamByEmail,
  getSingleTeamById,
  updateSingleTeam,
};
