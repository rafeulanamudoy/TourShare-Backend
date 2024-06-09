"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const joinTeam_validation_1 = require("./joinTeam.validation");
const joinTeam_controller_1 = require("./joinTeam.controller");
const router = express_1.default.Router();
exports.JoinTeamRoutes = router;
router.post("/", (0, validateRequest_1.default)(joinTeam_validation_1.JoinTeamValidation.createJoinTeamSchema), joinTeam_controller_1.JoinTeamController.createJoinTeam);
router.get("/", joinTeam_controller_1.JoinTeamController.getJointTeams);
router.get("/:email", joinTeam_controller_1.JoinTeamController.getSingleJoinTeam);
router.patch("/:id", joinTeam_controller_1.JoinTeamController.updateSingleJoinTeam);
router.delete("/:id", joinTeam_controller_1.JoinTeamController.deleteSingleJoinTeam);
