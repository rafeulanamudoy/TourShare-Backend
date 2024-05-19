import { Schema, model } from "mongoose";

import { UserRole } from "../../users/shared/users.const";
import { ICreateTeam } from "./createTeam.interface";

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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    joinPeople: [
      {
        type: Schema.Types.ObjectId,
        ref: "JoinTeam",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CreateTeam = model<ICreateTeam>("CreateTeam", creaTeTeamSchema);
