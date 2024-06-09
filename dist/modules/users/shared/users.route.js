"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_validation_1 = require("../shared/users.validation");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
exports.UserRoutes = router;
router.post("/signIn", (0, validateRequest_1.default)(users_validation_1.AuthValidation.loginZodSchema), users_controller_1.UserController.loginUser);
router.get("/:id", users_controller_1.UserController.getSingleUser);
