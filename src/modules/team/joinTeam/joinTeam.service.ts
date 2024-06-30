import mongoose from "mongoose";
import { IJoinTeam } from "./joinTeam.interface";
import { JoinTeam } from "./joinTeam.model";
import { CreateTeam } from "../createTeam/createTeam.model";
import ApiError from "../../../error/handleApiError";

import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";

const createJoinTeam = async (payload: IJoinTeam) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const team = await CreateTeam.findById({ _id: payload.teamInfo });

    if (!team) {
      throw new ApiError(400, "Invalid team ID. Team not found.");
    }

    if (team.email === payload.email) {
      throw new ApiError(
        400,
        "You are the creator of this team. You cannot join your own team."
      );
    }

    if (team.neededMembers < payload.groupMember) {
      throw new ApiError(
        400,
        `This team only needs ${team.neededMembers} members.`
      );
    }

    const [joinTeam] = await JoinTeam.create([payload], { session });

    await CreateTeam.findByIdAndUpdate(
      payload.teamInfo,
      {
        $push: {
          joinPeople: {
            joinTeamId: joinTeam._id,
            status: ENUM_jOIN_TEAM_STATUS.PENDING,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const populatedJoinTeam = await JoinTeam.findById(joinTeam._id).populate(
      "teamInfo"
    );
    return populatedJoinTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getJointTeams = async () => {
  const result = await JoinTeam.find({});
  return result;
};

const getSingleJoinTeam = async (email: string) => {
  const result = await JoinTeam.findOne({ email: email }).populate("teamInfo");
  return result;
};
const updateSingleJoinTeam = async (
  id: string,
  payload: Partial<IJoinTeam>
) => {
  const result = await JoinTeam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSingleJoinTeam = async (id: string) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const deleteTeam = await JoinTeam.findOneAndDelete(
      { _id: id },
      { session }
    );

    if (!deleteTeam) {
      throw new ApiError(404, "JoinTeam not found.");
    }
    await CreateTeam.findByIdAndUpdate(
      deleteTeam.teamInfo,
      { $pull: { joinPeople: { joinTeamId: deleteTeam._id } } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    return deleteTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const JoinTeamService = {
  createJoinTeam,
  getJointTeams,
  getSingleJoinTeam,
  updateSingleJoinTeam,
  deleteSingleJoinTeam,
};
