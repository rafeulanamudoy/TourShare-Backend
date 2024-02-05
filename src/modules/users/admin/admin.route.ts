import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";

import roleCheck from "../../../middlewares/roleCheck";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { multerUpload } from "../../../utilities/multer";

const router = express.Router();

export const AdminRoutes = router;
router.post(
  "/signUp",

  multerUpload.single("profileImage"),
  roleCheck(ENUM_USER_ROLE.ADMIN),
  validateRequest(AuthValidation.signUpZodSchema),

  AdminController.createUser
);
