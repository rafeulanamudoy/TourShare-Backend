import mongoose from "mongoose";
import { IJoinTeam } from "./joinTeam.interface";
import { JoinTeam } from "./joinTeam.model";
import { CreateTeam } from "../createTeam/createTeam.model";

const createJoinTeam = async (payload: IJoinTeam) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [joinTeam] = await JoinTeam.create([payload], { session });

    await CreateTeam.findByIdAndUpdate(
      payload.teamInfo,
      { $push: { joinPeople: joinTeam._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return joinTeam;
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
  const result = await JoinTeam.findOne({ email: email });
  return result;
};

export const JOinTeamService = {
  createJoinTeam,
  getJointTeams,
  getSingleJoinTeam,
};
