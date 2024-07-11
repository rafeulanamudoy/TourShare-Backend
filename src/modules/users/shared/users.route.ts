import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";

import { UserController } from "./users.controller";

const router = express.Router();

export const UserRoutes = router;
router.post(
  "/signIn",

  validateRequest(AuthValidation.loginZodSchema),

  UserController.loginUser
);
router.get(
  "/:id",

  UserController.getSingleUser
);

router.patch("/verify-email", UserController.verifyEmail);
router.post("/resend-verfyEmail", UserController.resendVerifyEmail);
