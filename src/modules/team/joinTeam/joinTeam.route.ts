import express from "express";

import validateRequest from "../../../middlewares/validateRequest";
import { JoinTeamValidation } from "./joinTeam.validation";
import { JoinTeamController } from "./joinTeam.controller";

const router = express.Router();

export const JoinTeamRoutes = router;
router.post(
  "/",
  validateRequest(JoinTeamValidation.joinTeamSchema),
  JoinTeamController.createJoinTeam
);
router.get(
  "/",

  JoinTeamController.getJointTeams
);

router.get("/:email", JoinTeamController.getSingleJoinTeam);
router.patch(
  "/:id",

  JoinTeamController.updateSingleJoinTeam
);
router.delete("/:id", JoinTeamController.deleteSingleJoinTeam);
