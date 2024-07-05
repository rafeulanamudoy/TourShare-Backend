"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notification_const_1 = require("./notification.const");
const NotificationStatus_1 = require("../../enums/NotificationStatus");
const NotificationSchema = new mongoose_1.Schema({
    recipient: {
        type: String,
        required: true,
        index: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: notification_const_1.NotificationType,
        index: true,
    },
    status: {
        type: String,
        enum: notification_const_1.NotificationStatus,
        default: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
        index: true,
    },
}, {
    timestamps: true,
});
exports.Notification = (0, mongoose_1.model)("notification", NotificationSchema);
