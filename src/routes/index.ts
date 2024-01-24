import express from "express";

import { AdminRoutes } from "../modules/users/admin/admin.route";
import { CustomerRoutes } from "../modules/users/customer/customer.route";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
