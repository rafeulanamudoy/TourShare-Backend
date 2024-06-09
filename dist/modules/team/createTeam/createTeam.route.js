"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const createTeam_controller_1 = require("./createTeam.controller");
const createTeam_validation_1 = require("./createTeam.validation");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const router = express_1.default.Router();
exports.CreateTeamRoutes = router;
router.post("/", (0, validateRequest_1.default)(createTeam_validation_1.CreateTeamValidation.createTeamSchema), createTeam_controller_1.CreateTeamController.createTeam);
router.get("/", createTeam_controller_1.CreateTeamController.getTeams);
router.get("/email/:email", createTeam_controller_1.CreateTeamController.getSingleTeamByEmail);
router.get("/id/:id", createTeam_controller_1.CreateTeamController.getSingleTeamById);
router.patch("/:id", createTeam_controller_1.CreateTeamController.updateSingleTeam);
router.patch("/accept/:id", (0, validateRequest_1.default)(createTeam_validation_1.CreateTeamValidation.acceptTeamSchema), createTeam_controller_1.CreateTeamController.acceptTeam);
