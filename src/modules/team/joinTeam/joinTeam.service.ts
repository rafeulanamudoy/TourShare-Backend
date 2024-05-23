import mongoose, { Document } from "mongoose";
import { IJoinTeam } from "./joinTeam.interface";
import { JoinTeam } from "./joinTeam.model";
import { CreateTeam } from "../createTeam/createTeam.model";
import ApiError from "../../../error/handleApiError";

const createJoinTeam = async (payload: IJoinTeam) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const team = await CreateTeam.findById({ _id: payload.teamInfo });

    if (!team) {
      throw new ApiError(400, "Invalid team ID. Team not found.");
    }
    if (team.email === payload.email) {
      console.log("i am in the matching email loop");
      throw new ApiError(
        400,
        "You are the  creator of this team.You cannot join at your own team"
      );
    }

    const [joinTeam] = await JoinTeam.create([payload], {
      session,
    });

    console.log(joinTeam, joinTeam);

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

export const JoinTeamService = {
  createJoinTeam,
  getJointTeams,
  getSingleJoinTeam,
};
