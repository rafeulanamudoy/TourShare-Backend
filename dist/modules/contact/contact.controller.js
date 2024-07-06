"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const contact_service_1 = require("./contact.service");
const createContact = (0, catchAsync_1.default)(async (req, res) => {
    const crateContact = req.body;
    const result = await contact_service_1.ContactService.createContact(crateContact);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "create  contact successfully",
        data: result,
    });
});
const getContacts = (0, catchAsync_1.default)(async (req, res) => {
    const messages = await contact_service_1.ContactService.getContacts();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "contacts get   successfully",
        data: messages,
    });
});
exports.ContactController = {
    createContact,
    getContacts,
};
