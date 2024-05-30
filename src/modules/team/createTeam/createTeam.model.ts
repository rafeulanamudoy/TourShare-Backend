import { Schema, model } from "mongoose";

import { IAccept, ICreateTeam } from "./createTeam.interface";
import { TeamStatus } from "./createTeam.constant";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";
const joinPeopleSchema = new Schema<IAccept>({
  joinTeamId: {
    type: Schema.Types.ObjectId,
    ref: "JoinTeam",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ENUM_jOIN_TEAM_STATUS),
    default: ENUM_jOIN_TEAM_STATUS.PENDING,
  },
});

const creaTeTeamSchema = new Schema<ICreateTeam>(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    currentMembers: {
      type: Number,
      required: true,
    },
    neededMembers: {
      type: Number,
      required: true,
    },
    nationalIdNumber: {
      type: String,
      required: true,
    },
    teamStatus: {
      type: String,
      enum: TeamStatus,
      default: ENUM_TEAM_STATUS.ONGOING,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    joinPeople: [joinPeopleSchema],
  },
  {
    timestamps: true,
  }
);
creaTeTeamSchema.index({ email: 1 }, { unique: true });
creaTeTeamSchema.index({ phoneNumber: 1 }, { unique: true });
export const CreateTeam = model<ICreateTeam>("CreateTeam", creaTeTeamSchema);
export const ensureIndexes = async () => {
  await CreateTeam.syncIndexes();
};

// Call this function at application startup
ensureIndexes();
