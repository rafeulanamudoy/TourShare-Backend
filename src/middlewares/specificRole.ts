import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { Secret } from "jsonwebtoken";
import ApiError from "../error/handleApiError";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";

const specificRole =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;
      console.log(role);

      // next();
    } catch (error) {
      next(error);
    }
  };

export default specificRole;
