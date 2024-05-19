import express from "express";

import { AdminRoutes } from "../modules/users/admin/admin.route";
import { CustomerRoutes } from "../modules/users/customer/customer.route";
import { SuperAdminRoutes } from "../modules/users/superAdmin/superAdmin.route";
import { UserRoutes } from "../modules/users/shared/users.route";
import { CreateTeamRoutes } from "../modules/team/createTeam/createTeam.route";
import { JoinTeamRoutes } from "../modules/team/joinTeam/joinTeam.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },

  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/superAdmin",
    route: SuperAdminRoutes,
  },
  {
    path: "/team",
    route: CreateTeamRoutes,
  },
  {
    path: "/joinTeam",
    route: JoinTeamRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
