import { Schema, model } from "mongoose";

import { IJoinTeam } from "./joinTeam.interface";
import { JoinTeamStatus } from "./joinTeam.const";
import { ENUM_jOIN_TEAM_STATUS } from "../../../enums/joinTeamStatus";

const creaTeTeamSchema = new Schema<IJoinTeam>(
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
    groupMember: {
      type: Number,
      required: true,
    },
    nationalIdNumber: {
      type: String,
      required: true,
    },
    staus: {
      type: String,
      enum: JoinTeamStatus,
      default: ENUM_jOIN_TEAM_STATUS.INTERESTED,
    },
    teamInfo: {
      type: Schema.Types.ObjectId,
      ref: "CreateTeam",
    },
  },
  {
    timestamps: true,
  }
);

export const JoinTeam = model<IJoinTeam>("JoinTeam", creaTeTeamSchema);
