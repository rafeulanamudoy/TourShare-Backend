"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTeamService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joinTeam_model_1 = require("./joinTeam.model");
const createTeam_model_1 = require("../createTeam/createTeam.model");
const handleApiError_1 = __importDefault(require("../../../error/handleApiError"));
const joinTeamStatus_1 = require("../../../enums/joinTeamStatus");
const createJoinTeam = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const team = await createTeam_model_1.CreateTeam.findById({ _id: payload.teamInfo });
        if (!team) {
            throw new handleApiError_1.default(400, "Invalid team ID. Team not found.");
        }
        if (team.email === payload.email) {
            //console.log("i am in the matching email loop");
            throw new handleApiError_1.default(400, "You are the  creator of this team.You cannot join at your own team");
        }
        if (team.neededMembers < payload.groupMember) {
            throw new handleApiError_1.default(400, `this team only need ${team.neededMembers} members`);
        }
        const [joinTeam] = await joinTeam_model_1.JoinTeam.create([payload], {
            session,
        });
        await createTeam_model_1.CreateTeam.findByIdAndUpdate(payload.teamInfo, {
            $push: {
                joinPeople: {
                    joinTeamId: joinTeam._id,
                    status: joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING,
                },
            },
        }, { session });
        await session.commitTransaction();
        session.endSession();
        return joinTeam;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getJointTeams = async () => {
    const result = await joinTeam_model_1.JoinTeam.find({});
    return result;
};
const getSingleJoinTeam = async (email) => {
    const result = await joinTeam_model_1.JoinTeam.findOne({ email: email });
    return result;
};
const updateSingleJoinTeam = async (id, payload) => {
    const result = await joinTeam_model_1.JoinTeam.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteSingleJoinTeam = async (id) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deleteTeam = await joinTeam_model_1.JoinTeam.findOneAndDelete({ _id: id }, { session });
        if (!deleteTeam) {
            throw new handleApiError_1.default(404, "JoinTeam not found.");
        }
        await createTeam_model_1.CreateTeam.findByIdAndUpdate(deleteTeam.teamInfo, { $pull: { joinPeople: deleteTeam._id } }, { session });
        await session.commitTransaction();
        session.endSession();
        return deleteTeam;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.JoinTeamService = {
    createJoinTeam,
    getJointTeams,
    getSingleJoinTeam,
    updateSingleJoinTeam,
    deleteSingleJoinTeam,
};
