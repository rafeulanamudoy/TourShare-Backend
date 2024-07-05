"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const messages_service_1 = require("./messages.service");
const createMessage = (0, catchAsync_1.default)(async (req, res) => {
    const createMessage = req.body;
    // console.log(req.body, "create message");
    const result = await messages_service_1.MessageService.createMessage(createMessage);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Message create   successfully",
        data: result,
    });
});
const getMessages = (0, catchAsync_1.default)(async (req, res) => {
    const { senderId, recipientId } = req.query;
    const messages = await messages_service_1.MessageService.getMessages(senderId, recipientId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Message get   successfully",
        data: messages,
    });
});
exports.MessageController = {
    createMessage,
    getMessages,
};
