import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContact = async (payload: IContact) => {
  const result = await Contact.create(payload);
  return result;
};
const getContacts = async () => {
  const messages = await Contact.find({});

  return messages;
};

export const ContactService = {
  createContact,
  getContacts,
};
