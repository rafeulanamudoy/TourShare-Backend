"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const createTeam_model_1 = require("./createTeam.model");
const joinTeamStatus_1 = require("../../../enums/joinTeamStatus");
const handleApiError_1 = __importDefault(require("../../../error/handleApiError"));
const joinTeam_model_1 = require("../joinTeam/joinTeam.model");
const createTeam = async (payload) => {
    const result = await createTeam_model_1.CreateTeam.create(payload);
    return result;
};
const getTeams = async () => {
    const result = await createTeam_model_1.CreateTeam.find({});
    return result;
};
const getSingleTeamByEmail = async (email) => {
    const result = await createTeam_model_1.CreateTeam.findOne({ email: email }).populate({
        path: "joinPeople.joinTeamId",
        model: "JoinTeam",
    });
    return result;
};
const getSingleTeamById = async (id) => {
    const result = await createTeam_model_1.CreateTeam.findById(id).populate({
        path: "joinPeople.joinTeamId",
        model: "JoinTeam",
    });
    return result;
};
const updateSingleTeam = async (id, payload) => {
    const result = await createTeam_model_1.CreateTeam.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const acceptTeam = async (id, payload) => {
    const team = await createTeam_model_1.CreateTeam.findById(id).populate("joinPeople");
    if (!team) {
        throw new handleApiError_1.default(404, "Team not found.");
    }
    const joinPerson = team.joinPeople.find((person) => person.joinTeamId.toString() === payload.joinTeamId.toString());
    if (!joinPerson) {
        throw new handleApiError_1.default(404, "JoinTeam not found in the team.");
    }
    if (team.neededMembers !== 0 &&
        payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.ACCEPTED &&
        team.neededMembers < payload.members) {
        throw new handleApiError_1.default(400, `Your Team Only Needed ${team.neededMembers}`);
    }
    else if (team.neededMembers === 0 &&
        payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.ACCEPTED) {
        throw new handleApiError_1.default(400, `Your Team is Full`);
    }
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        if ((joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING ||
            joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED) &&
            (payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
                payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING)) {
            const result = await createTeam_model_1.CreateTeam.findOneAndUpdate({ _id: id }, {
                $set: { "joinPeople.$[element].status": payload.status },
            }, {
                arrayFilters: [
                    {
                        "element.joinTeamId": new mongoose_1.default.Types.ObjectId(payload.joinTeamId),
                    },
                ],
                new: true,
                session,
            });
            await joinTeam_model_1.JoinTeam.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(payload.joinTeamId), { status: payload.status }, { new: true });
            await session.commitTransaction();
            session.endSession();
            return result;
        }
        else if (((joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
            joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING) &&
            payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.ACCEPTED) ||
            ((payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED ||
                payload.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING) &&
                joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.ACCEPTED)) {
            const result = await createTeam_model_1.CreateTeam.findOneAndUpdate({ _id: id }, {
                $inc: {
                    currentMembers: joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING ||
                        joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED
                        ? payload.members
                        : -payload.members,
                    neededMembers: joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.PENDING ||
                        joinPerson.status === joinTeamStatus_1.ENUM_jOIN_TEAM_STATUS.NOTACCEPTED
                        ? -payload.members
                        : +payload.members,
                },
                $set: { "joinPeople.$[element].status": payload.status },
            }, {
                arrayFilters: [
                    {
                        "element.joinTeamId": new mongoose_1.default.Types.ObjectId(payload.joinTeamId),
                    },
                ],
                new: true,
                session,
            });
            await joinTeam_model_1.JoinTeam.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(payload.joinTeamId), { status: payload.status }, { new: true });
            await session.commitTransaction();
            session.endSession();
            return result;
        }
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const deleteSingleTeam = async (id) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deleteTeam = await createTeam_model_1.CreateTeam.findOneAndDelete({ _id: id }, { session }).populate({
            path: "joinPeople.joinTeamId",
            model: "JoinTeam",
        });
        if (!deleteTeam) {
            throw new handleApiError_1.default(404, "Team not found.");
        }
        // Deleting associated JoinTeam documents
        const joinPeople = deleteTeam.joinPeople;
        for (const joinPerson of joinPeople) {
            await joinTeam_model_1.JoinTeam.findByIdAndDelete(joinPerson.joinTeamId, { session });
        }
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
exports.CreateTeamService = {
    createTeam,
    getTeams,
    getSingleTeamByEmail,
    getSingleTeamById,
    updateSingleTeam,
    acceptTeam,
    deleteSingleTeam,
};
