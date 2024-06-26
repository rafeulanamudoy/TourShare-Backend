import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interface/error";
import { IGenericErrorResponse } from "../interface/general";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  console.log(error, "zod validatin error");
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Zod Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
