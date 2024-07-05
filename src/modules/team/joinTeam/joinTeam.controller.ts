import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import { JoinTeamService } from "./joinTeam.service";
import { IJoinTeam } from "./joinTeam.interface";

const createJoinTeam = catchAsync(async (req: Request, res: Response) => {
  const createTeam = req.body;

  const result = await JoinTeamService.createJoinTeam(createTeam);

  sendResponse<IJoinTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Join Team Request send    successfully",
    data: result,
  });
});
const getJointTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await JoinTeamService.getJointTeams();

  sendResponse<IJoinTeam[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "JOinTeam get   successfully",
    data: result,
  });
});
const getSingleJoinTeam = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await JoinTeamService.getSingleJoinTeam(email);

  sendResponse<IJoinTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Single  Join Team get   successfully",
    data: result,
  });
});
const updateSingleJoinTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await JoinTeamService.updateSingleJoinTeam(id, updateData);

  sendResponse<IJoinTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Join team  updated successfully",
    data: result,
  });
});
const deleteSingleJoinTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await JoinTeamService.deleteSingleJoinTeam(id);

  sendResponse<IJoinTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Join team  deleted  successfully",
    data: result,
  });
});
export const JoinTeamController = {
  createJoinTeam,
  getJointTeams,
  getSingleJoinTeam,
  updateSingleJoinTeam,
  deleteSingleJoinTeam,
};
