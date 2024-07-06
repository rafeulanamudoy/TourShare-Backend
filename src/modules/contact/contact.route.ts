import express from "express";

import { ContactController } from "./contact.controller";

const router = express.Router();

export const ContactRoutes = router;
router.post(
  "/",

  ContactController.createContact
);
router.get(
  "/",

  ContactController.getContacts
);
