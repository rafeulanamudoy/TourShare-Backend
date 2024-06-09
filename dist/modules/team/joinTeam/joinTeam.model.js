"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTeam = void 0;
const mongoose_1 = require("mongoose");
const joinTeam_const_1 = require("./joinTeam.const");
const joinTeamStatus_1 = require("../../../enums/joinTeamStatus");
const creaTeTeamSchema = new mongoose_1.Schema({
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
    status: {
        type: String,
        enum: joinTeam_const_1.JoinTeamStatus,
        default: joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING,
    },
    teamInfo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CreateTeam",
    },
}, {
    timestamps: true,
});
exports.JoinTeam = (0, mongoose_1.model)("JoinTeam", creaTeTeamSchema);
