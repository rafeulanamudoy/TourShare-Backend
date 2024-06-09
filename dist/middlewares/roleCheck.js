"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleApiError_1 = __importDefault(require("../error/handleApiError"));
const roleCheck = (requiredRole) => async (req, res, next) => {
    try {
        const { role } = req.body;
        console.log(req.body, "check body");
        //console.log(JSON.parse(req.body.name));
        // console.log(req.file), "from roleCheck middleware";
        if (role !== requiredRole) {
            throw new handleApiError_1.default(400, `you are not authorized to create ${requiredRole} Account`);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = roleCheck;
