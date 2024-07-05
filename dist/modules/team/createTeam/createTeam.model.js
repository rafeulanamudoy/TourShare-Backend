"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIndexes = exports.CreateTeam = void 0;
const mongoose_1 = require("mongoose");
const createTeam_constant_1 = require("./createTeam.constant");
const teamStatus_1 = require("../../../enums/teamStatus");
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
        enum: createTeam_constant_1.TeamStatus,
        default: teamStatus_1.ENUM_TEAM_STATUS.ONGOING,
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
        depurture: {
            type: String,
            default: "",
        },
        depurtureTime: {
            type: String,
            required: true,
        },
        returnTime: {
            type: String,
            required: true,
        },
        accommodations: {
            type: String,
            default: "",
        },
        transportation: {
            type: String,
            enum: createTeam_constant_1.transportation,
        },
        activities: [
            {
                activity: {
                    type: String,
                    default: "",
                },
            },
        ],
        costBreakDown: {
            type: String,
            required: true,
        },
        responsibilities: [
            {
                responsibility: {
                    type: String,
                    default: "",
                },
            },
        ],
    },
    joinPeople: [
        {
            joinTeamId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "JoinTeam",
                required: true,
            },
            status: {
                type: String,
                enum: createTeam_constant_1.JoinTeamStatus,
                default: joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING,
            },
        },
    ],
}, {
    timestamps: true,
});
creaTeTeamSchema.index({ email: 1 }, { unique: true });
creaTeTeamSchema.index({ phoneNumber: 1 }, { unique: true });
exports.CreateTeam = (0, mongoose_1.model)("CreateTeam", creaTeTeamSchema);
const ensureIndexes = async () => {
    await exports.CreateTeam.syncIndexes();
};
exports.ensureIndexes = ensureIndexes;
// Call this function at application startup
(0, exports.ensureIndexes)();
