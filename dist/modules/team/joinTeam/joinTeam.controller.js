"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTeamController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const joinTeam_service_1 = require("./joinTeam.service");
const createJoinTeam = (0, catchAsync_1.default)(async (req, res) => {
    const createTeam = req.body;
    console.log(req.body, "create team");
    const result = await joinTeam_service_1.JoinTeamService.createJoinTeam(createTeam);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Join Team Request send    successfully",
        data: result,
    });
});
const getJointTeams = (0, catchAsync_1.default)(async (req, res) => {
    const result = await joinTeam_service_1.JoinTeamService.getJointTeams();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "JOinTeam get   successfully",
        data: result,
    });
});
const getSingleJoinTeam = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.params.email;
    const result = await joinTeam_service_1.JoinTeamService.getSingleJoinTeam(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single  Join Team get   successfully",
        data: result,
    });
});
const updateSingleJoinTeam = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await joinTeam_service_1.JoinTeamService.updateSingleJoinTeam(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Join team  updated successfully",
        data: result,
    });
});
const deleteSingleJoinTeam = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(id, "id");
    const result = await joinTeam_service_1.JoinTeamService.deleteSingleJoinTeam(id);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Join team  deleted  successfully",
        data: result,
    });
});
exports.JoinTeamController = {
    createJoinTeam,
    getJointTeams,
    getSingleJoinTeam,
    updateSingleJoinTeam,
    deleteSingleJoinTeam,
};
