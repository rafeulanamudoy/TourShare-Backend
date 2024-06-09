import { Schema, model } from "mongoose";

import { ICreateTeam } from "./createTeam.interface";
import { JoinTeamStatus, TeamStatus } from "./createTeam.constant";
import { ENUM_TEAM_STATUS } from "../../../enums/teamStatus";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";

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
    teamName: {
      type: String,
      required: true,
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
    budget: {
      type: Number,
      requered: true,
    },
    teamDetails: {
      description: {
        type: String,
        default: "",
      },
      meetingPoint: {
        type: String,
        default: "",
      },
      meetingTime: {
        type: Date,
        default: Date.now,
      },
      tripDuration: {
        type: String,
        default: "",
      },
      accommodations: {
        type: String,
        default: "",
      },
      transportation: {
        type: String,
        default: "",
      },
      activities: [
        {
          type: String,
          default: "",
        },
      ],
      costBreakdown: {
        type: String,
        default: "",
      },
      requirements: {
        type: String,
        default: "",
      },
    },
    joinPeople: [
      {
        joinTeamId: {
          type: Schema.Types.ObjectId,
          ref: "JoinTeam",
          required: true,
        },
        status: {
          type: String,
          enum: JoinTeamStatus,
          default: ENUM_jOIN_TEAM_STATUS.PENDING,
        },
      },
    ],
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
