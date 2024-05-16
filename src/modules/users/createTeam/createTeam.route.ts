import express from "express";
import { CreateTeamController } from "./createTeam.controller";
import { CreateTeamValidation } from "./createTeam.validation";
import validateRequest from "../../../middlewares/validateRequest";

const router = express.Router();

export const CreateTeamRoutes = router;
router.post(
  "/",
  validateRequest(CreateTeamValidation.createTeamSchema),
  CreateTeamController.createTeam
);