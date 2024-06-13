import express from "express";
import { MessageController } from "./messages.controller";
import { MessageValidation } from "./message.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

export const MessageRoutes = router;
router.post(
  "/",
  validateRequest(MessageValidation.CreateMessageSchema),

  MessageController.createMessage
);
router.get(
  "/",

  MessageController.getMessages
);
