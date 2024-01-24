import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";

import roleCheck from "../../../middlewares/roleCheck";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { SuperAdminController } from "./superAdmin.controller";
import superAdminCredential from "./superAdminMiddleware";

const router = express.Router();

export const SuperAdminRoutes = router;
router.post(
  "/signUp",
  superAdminCredential(),
  validateRequest(AuthValidation.signUpZodSchema),

  SuperAdminController.createUser
);
