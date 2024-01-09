import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interface/error";

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  const statusCode = 400;
  // Add code here if you want to do something with the errors

  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};

export default handleCastError;
