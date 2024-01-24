import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";

import roleCheck from "../../../middlewares/roleCheck";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { CustomerController } from "./customer.controller";

const router = express.Router();

export const CustomerRoutes = router;
router.post(
  "/signUp",
  roleCheck(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(AuthValidation.signUpZodSchema),

  CustomerController.createUser
);
