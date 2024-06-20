import express from "express";
import { NotificationController } from "./notification.controller";
import { NoticationValidation } from "./notification.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

export const NotificationRoutes = router;
router.post(
  "/",
  validateRequest(NoticationValidation.createNoticationSchema),
  NotificationController.createNotification
);

router.get("/", NotificationController.getUserNotification);

router.patch("/:id", NotificationController.updateNotification);
