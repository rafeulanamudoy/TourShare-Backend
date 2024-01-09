import { MongoError } from "mongodb";
import { IGenericErrorMessage } from "../interface/error";
const duplicateError = (error: MongoError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate Entry.Phone Number And Email Must Have To Unique",
    errorMessages: errors,
  };
};

export default duplicateError;
