import express from "express";
import { MessageController } from "./messages.controller";

const router = express.Router();

export const MessageRoutes = router;
router.post(
  "/",

  MessageController.createMessage
);
router.get(
  "/",

  MessageController.getMessages
);
