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
router.get(
  "/",

  CreateTeamController.getTeams
);

router.get("/email/:email", CreateTeamController.getSingleTeamByEmail);
router.get("/id/:id", CreateTeamController.getSingleTeamById);

router.patch(
  "/:id",

  CreateTeamController.updateSingleTeam
);

router.patch(
  "/accept/:id",
  validateRequest(CreateTeamValidation.acceptTeamSchema),
  CreateTeamController.acceptTeam
);
router.delete("/:id", CreateTeamController.deleteSingleTeam);
