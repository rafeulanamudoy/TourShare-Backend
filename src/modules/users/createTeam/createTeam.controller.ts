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
export const CreateTeamController = {
  createTeam,
};
