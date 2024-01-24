import express from "express";

import specificRole from "../../../middlewares/specificRole";
import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import adminMiddleware from "./admin.middleware";

const router = express.Router();

export const AdminRoutes = router;
router.post(
  "/signUp",
  adminMiddleware(),
  validateRequest(AuthValidation.signUpZodSchema),

  AdminController.createUser
);
