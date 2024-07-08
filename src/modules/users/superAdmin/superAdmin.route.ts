import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";

import roleCheck from "../../../middlewares/roleCheck";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { SuperAdminController } from "./superAdmin.controller";
import superAdminCredential from "./superAdminMiddleware";
import { multerUpload } from "../../../utilities/multer";
import { UserController } from "../shared/users.controller";

const router = express.Router();

export const SuperAdminRoutes = router;
router.post(
  "/signUp",
  multerUpload.single("profileImage"),
  superAdminCredential(),

  validateRequest(AuthValidation.signUpZodSchema),

  UserController.createUser
);
router.patch(
  "/:id",
  multerUpload.single("profileImage"),
  UserController.updateSingleUser
);
router.get(
  "/users",

  UserController.getAllUsers
);
router.delete("/:id", UserController.deleteSingleUser);
