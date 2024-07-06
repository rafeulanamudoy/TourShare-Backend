"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contact_model_1 = require("./contact.model");
const createContact = async (payload) => {
    const result = await contact_model_1.Contact.create(payload);
    return result;
};
const getContacts = async () => {
    const messages = await contact_model_1.Contact.find({});
    return messages;
};
exports.ContactService = {
    createContact,
    getContacts,
};
