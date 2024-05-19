import { Schema, model } from "mongoose";

import { IJoinTeam } from "./joinTeam.interface";

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
