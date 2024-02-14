import httpStatus from "http-status";
import ApiError from "../../../error/handleApiError";

import { NextFunction, Request, Response } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import config from "../../../config";
const superAdminCredential =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credential = req.body;
      console.log(credential, "from superAdminMiddleware");

      if (!credential || !credential.role || !credential.secret_key) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Invalid request. Please provide both 'role' and 'secret_key'."
        );
      }

      if (credential.role !== ENUM_USER_ROLE.SUPER_ADMIN) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You Are Not Allowed to Create a Super Admin Account. Role must be SUPER_ADMIN."
        );
      }

      if (credential.secret_key !== config.super_admin_secret_key) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You Are Not Allowed to Create a Super Admin Account. Provide Correct Secret key."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default superAdminCredential;
