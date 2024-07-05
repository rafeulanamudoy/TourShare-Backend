"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const notification_service_1 = require("./notification.service");
const createNotification = (0, catchAsync_1.default)(async (req, res) => {
    const notification = req.body;
    const result = await notification_service_1.NotificationService.createNotification(notification);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Notification saved    successfully",
        data: result,
    });
});
const getUserNotification = (0, catchAsync_1.default)(async (req, res) => {
    const { recipient, status, type } = req.query;
    const messages = await notification_service_1.NotificationService.getUserNotification(recipient, status, type);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user notification  get   successfully",
        data: messages,
    });
});
const updateNotification = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const messages = await notification_service_1.NotificationService.updateNotification(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user notification  update    successfully",
        data: messages,
    });
});
exports.NotificationController = {
    createNotification,
    getUserNotification,
    updateNotification,
};
