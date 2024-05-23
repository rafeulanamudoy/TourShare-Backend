import { MongoError } from "mongodb";
import { IGenericErrorMessage } from "../interface/error";
const duplicateError = (error: MongoError) => {
  /// console.log(error, "duplicate error checked from server");
  const errors: IGenericErrorMessage[] = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message:
      "Already Have a Account.Phone Number And Email Must Have To Be Unique",
    errorCode: error.code,

    errorMessages: errors,
  };
};

export default duplicateError;
