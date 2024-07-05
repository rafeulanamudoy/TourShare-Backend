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
  const result = await CreateTeam.findOne({ email: email }).populate({
    path: "joinPeople.joinTeamId",
    model: "JoinTeam",
  });
  return result;
};
const getSingleTeamById = async (id: string) => {
  const result = await CreateTeam.findById(id).populate({
    path: "joinPeople.joinTeamId",
    model: "JoinTeam",
  });
  return result;
};
const updateSingleTeam = async (id: string, payload: Partial<ICreateTeam>) => {
  const result = await CreateTeam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const acceptTeam = async (id: string, payload: IAccept) => {
  const team = await CreateTeam.findById(id).populate("joinPeople");
  if (!team) {
    throw new ApiError(404, "Team not found.");
  }
  const joinPerson = team.joinPeople.find(
    (person: any) =>
      person.joinTeamId.toString() === payload.joinTeamId.toString()
  );

  if (!joinPerson) {
    throw new ApiError(404, "JoinTeam not found in the team.");
  }

  if (
    team.neededMembers !== 0 &&
    payload.status === ENUM_jOIN_TEAM_STATUS.ACCEPTED &&
    team.neededMembers < payload.members
  ) {
    throw new ApiError(400, `Your Team Only Needed ${team.neededMembers}`);
  } else if (
    team.neededMembers === 0 &&
    payload.status === ENUM_jOIN_TEAM_STATUS.ACCEPTED
  ) {
    throw new ApiError(400, `Your Team is Full`);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (
      (joinPerson.status === ENUM_jOIN_TEAM_STATUS.PENDING ||
        joinPerson.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED) &&
      (payload.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
        payload.status === ENUM_jOIN_TEAM_STATUS.PENDING)
    ) {
      const result = await CreateTeam.findOneAndUpdate(
        { _id: id },
        {
          $set: { "joinPeople.$[element].status": payload.status },
        },
        {
          arrayFilters: [
            {
              "element.joinTeamId": new mongoose.Types.ObjectId(
                payload.joinTeamId
              ),
            },
          ],
          new: true,
          session,
        }
      );
      await JoinTeam.findByIdAndUpdate(
        new mongoose.Types.ObjectId(payload.joinTeamId),
        { status: payload.status },
        { new: true }
      );
      await session.commitTransaction();
      session.endSession();
      return result;
    } else if (
      ((joinPerson.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
        joinPerson.status === ENUM_jOIN_TEAM_STATUS.PENDING) &&
        payload.status === ENUM_jOIN_TEAM_STATUS.ACCEPTED) ||
      ((payload.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
        payload.status === ENUM_jOIN_TEAM_STATUS.PENDING) &&
        joinPerson.status === ENUM_jOIN_TEAM_STATUS.ACCEPTED)
    ) {
      const result = await CreateTeam.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            currentMembers:
              joinPerson.status === ENUM_jOIN_TEAM_STATUS.PENDING ||
              joinPerson.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED
                ? payload.members
                : -payload.members,
            neededMembers:
              joinPerson.status === ENUM_jOIN_TEAM_STATUS.PENDING ||
              joinPerson.status === ENUM_jOIN_TEAM_STATUS.NOTACCEPTED
                ? -payload.members
                : +payload.members,
          },
          $set: { "joinPeople.$[element].status": payload.status },
        },
        {
          arrayFilters: [
            {
              "element.joinTeamId": new mongoose.Types.ObjectId(
                payload.joinTeamId
              ),
            },
          ],
          new: true,
          session,
        }
      );
      await JoinTeam.findByIdAndUpdate(
        new mongoose.Types.ObjectId(payload.joinTeamId),
        { status: payload.status },
        { new: true }
      );
      await session.commitTransaction();
      session.endSession();
      return result;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const deleteSingleTeam = async (id: string) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const deleteTeam = await CreateTeam.findOneAndDelete(
      { _id: id },
      { session }
    ).populate({
      path: "joinPeople.joinTeamId",
      model: "JoinTeam",
    });

    if (!deleteTeam) {
      throw new ApiError(404, "Team not found.");
    }

    // Deleting associated JoinTeam documents
    const joinPeople = deleteTeam.joinPeople;
    for (const joinPerson of joinPeople) {
      await JoinTeam.findByIdAndDelete(joinPerson.joinTeamId, { session });
    }

    await session.commitTransaction();
    session.endSession();
    return deleteTeam;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const CreateTeamService = {
  createTeam,
  getTeams,
  getSingleTeamByEmail,
  getSingleTeamById,
  updateSingleTeam,
  acceptTeam,
  deleteSingleTeam,
};
