"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../utilities/multer");
const users_controller_1 = require("../shared/users.controller");
const router = express_1.default.Router();
exports.CustomerRoutes = router;
router.post("/signUp", multer_1.multerUpload.single("profileImage"), users_controller_1.UserController.createUser);
router.patch("/:id", multer_1.multerUpload.single("profileImage"), users_controller_1.UserController.updateSingleUser);
