import { ErrorRequestHandler } from "express";

import { MongoError } from "mongodb";
import { ZodError } from "zod";

import { IGenericErrorMessage } from "../interface/error";

import config from "../config";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import duplicateError from "../error/handleDuplicateError";
import ApiError from "../error/handleApiError";
import handleZodError from "../error/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name == "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof MongoError && err.code === 11000) {
    const simplifiedError = duplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;

    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }

  {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,

      stack: config.env !== "production" ? err?.stack : undefined,
    });
    next();
  }
};

export default globalErrorHandler;
