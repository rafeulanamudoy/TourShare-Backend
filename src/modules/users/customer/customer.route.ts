import express from "express";

import { AuthValidation } from "../shared/users.validation";
import validateRequest from "../../../middlewares/validateRequest";

import roleCheck from "../../../middlewares/roleCheck";
import { ENUM_USER_ROLE } from "../../../enums/user";

import { multerUpload } from "../../../utilities/multer";
import { UserController } from "../shared/users.controller";

const router = express.Router();

export const CustomerRoutes = router;
router.post(
  "/signUp",

  // validateRequest(AuthValidation.signUpZodSchema),
  multerUpload.single("profileImage"),

  UserController.createUser
);

router.patch(
  "/:id",
  multerUpload.single("profileImage"),

  UserController.updateSingleUser
);
