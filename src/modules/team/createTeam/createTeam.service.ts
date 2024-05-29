import mongoose, { Types } from "mongoose";
import { IAccept, ICreateTeam } from "./createTeam.interface";
import { CreateTeam } from "./createTeam.model";

import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";
import ApiError from "../../../error/handleApiError";
import { JoinTeam } from "../joinTeam/joinTeam.model";

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
const acceptTeam = async (id: string, payload: IAccept) => {
  const result = await CreateTeam.findById(id);

  if (result && result?.neededMembers < payload.members) {
    throw new ApiError(400, `Member Needed Only ${result.currentMembers}`);
  } else if (payload.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED) {
    console.log("you are not accepted");
    console.log(payload.status, payload.joinTeamId, "status check");
    await JoinTeam.findByIdAndUpdate(
      { _id: payload.joinTeamId },
      { status: payload.status },
      { new: true }
    );
    return await CreateTeam.findById(id);
  } else if (
    payload.status === ENUM_jOIN_TEAM_STATUS.ACCEPTED &&
    payload.members
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await CreateTeam.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            currentMembers: payload.members,
            neededMembers: -payload.members,
          },
        },
        { new: true, session }
      );
      await JoinTeam.findByIdAndUpdate(
        { _id: payload.joinTeamId },
        { status: payload.status },
        { new: true }
      );
      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
};
export const CreateTeamService = {
  createTeam,
  getTeams,
  getSingleTeamByEmail,
  getSingleTeamById,
  updateSingleTeam,
  acceptTeam,
};
