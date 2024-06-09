"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createTeam_service_1 = require("./createTeam.service");
const http_status_1 = __importDefault(require("http-status"));
const createTeam = (0, catchAsync_1.default)(async (req, res) => {
    const createTeam = req.body;
    console.log(req.body, "create team");
    const result = await createTeam_service_1.CreateTeamService.createTeam(createTeam);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Create Team Created   successfully",
        data: result,
    });
});
const getTeams = (0, catchAsync_1.default)(async (req, res) => {
    const result = await createTeam_service_1.CreateTeamService.getTeams();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Team get   successfully",
        data: result,
    });
});
const getSingleTeamByEmail = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.params.email;
    const result = await createTeam_service_1.CreateTeamService.getSingleTeamByEmail(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single Team get   successfully",
        data: result,
    });
});
const getSingleTeamById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await createTeam_service_1.CreateTeamService.getSingleTeamById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single Team get   successfully",
        data: result,
    });
});
const updateSingleTeam = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await createTeam_service_1.CreateTeamService.updateSingleTeam(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "team  updated successfully",
        data: result,
    });
});
const acceptTeam = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await createTeam_service_1.CreateTeamService.acceptTeam(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "team  accept successfully",
        data: result,
    });
});
exports.CreateTeamController = {
    createTeam,
    getTeams,
    getSingleTeamByEmail,
    updateSingleTeam,
    getSingleTeamById,
    acceptTeam,
};
