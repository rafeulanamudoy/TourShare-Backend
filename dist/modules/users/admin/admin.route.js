"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_validation_1 = require("../shared/users.validation");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const roleCheck_1 = __importDefault(require("../../../middlewares/roleCheck"));
const user_1 = require("../../../enums/user");
const multer_1 = require("../../../utilities/multer");
const users_controller_1 = require("../shared/users.controller");
const router = express_1.default.Router();
exports.AdminRoutes = router;
router.post("/signUp", multer_1.multerUpload.single("profileImage"), (0, roleCheck_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(users_validation_1.AuthValidation.signUpZodSchema), users_controller_1.UserController.createUser);
router.patch("/:id", multer_1.multerUpload.single("profileImage"), users_controller_1.UserController.updateSingleUser);
