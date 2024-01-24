import express from "express";

import { AdminRoutes } from "../modules/users/admin/admin.route";
import { CustomerRoutes } from "../modules/users/customer/customer.route";
import { SuperAdminRoutes } from "../modules/users/superAdmin/superAdmin.route";

const router = express.Router();

const moduleRoutes = [
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
