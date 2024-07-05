"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/users/admin/admin.route");
const customer_route_1 = require("../modules/users/customer/customer.route");
const superAdmin_route_1 = require("../modules/users/superAdmin/superAdmin.route");
const users_route_1 = require("../modules/users/shared/users.route");
const createTeam_route_1 = require("../modules/team/createTeam/createTeam.route");
const joinTeam_route_1 = require("../modules/team/joinTeam/joinTeam.route");
const messages_route_1 = require("../modules/messages/messages.route");
const notification_route_1 = require("../modules/notification/notification.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: users_route_1.UserRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/customer",
        route: customer_route_1.CustomerRoutes,
    },
    {
        path: "/superAdmin",
        route: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: "/team",
        route: createTeam_route_1.CreateTeamRoutes,
    },
    {
        path: "/joinTeam",
        route: joinTeam_route_1.JoinTeamRoutes,
    },
    {
        path: "/messages",
        route: messages_route_1.MessageRoutes,
    },
    {
        path: "/notification",
        route: notification_route_1.NotificationRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.routes = router;
