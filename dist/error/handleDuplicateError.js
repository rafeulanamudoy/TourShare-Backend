"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicateError = (error) => {
    /// console.log(error, "duplicate error checked from server");
    const errors = [
        {
            path: "",
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Already Have a Account.Phone Number And Email Must Have To Be Unique",
        errorCode: error.code,
        errorMessages: errors,
    };
};
exports.default = duplicateError;
