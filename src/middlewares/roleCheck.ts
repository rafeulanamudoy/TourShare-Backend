import { NextFunction, Request, Response } from "express";
import ApiError from "../error/handleApiError";

import { IUserRole } from "../modules/users/shared/users.interface";

const roleCheck =
  (requiredRole: IUserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;
      if (role !== requiredRole) {
        throw new ApiError(
          400,
          `you are not authorized to create ${requiredRole} Account`
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default roleCheck;
