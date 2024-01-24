import { NextFunction, Request, Response } from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import ApiError from "../../../error/handleApiError";

const adminMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;
      if (role !== ENUM_USER_ROLE.ADMIN) {
        throw new ApiError(
          400,
          "you are not authorized to create Admin Account"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default adminMiddleware;
