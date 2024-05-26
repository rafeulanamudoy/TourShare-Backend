import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CreateTeamService } from "./createTeam.service";
import { ICreateTeam } from "./createTeam.interface";
import httpStatus from "http-status";

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const createTeam = req.body;
  console.log(req.body, "create team");

  const result = await CreateTeamService.createTeam(createTeam);

  sendResponse<ICreateTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Create Team Created   successfully",
    data: result,
  });
});
const getTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await CreateTeamService.getTeams();

  sendResponse<ICreateTeam[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Team get   successfully",
    data: result,
  });
});
const getSingleTeamByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await CreateTeamService.getSingleTeamByEmail(email);

  sendResponse<ICreateTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Single Team get   successfully",
    data: result,
  });
});
const getSingleTeamById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CreateTeamService.getSingleTeamById(id);

  sendResponse<ICreateTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Single Team get   successfully",
    data: result,
  });
});
const updateSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await CreateTeamService.updateSingleTeam(id, updateData);

  sendResponse<ICreateTeam>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "team  updated successfully",
    data: result,
  });
});
export const CreateTeamController = {
  createTeam,
  getTeams,
  getSingleTeamByEmail,
  updateSingleTeam,
  getSingleTeamById,
};
