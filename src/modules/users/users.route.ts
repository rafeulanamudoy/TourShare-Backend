import express from "express";
import { UserController } from "./users.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./user.validation";

const router = express.Router();

export const UserRoutes = router;
router.post(
  "/signUp",
  validateRequest(AuthValidation.signUpZodSchema),
  UserController.createUser
);
