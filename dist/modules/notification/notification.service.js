"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const NotificationStatus_1 = require("../../enums/NotificationStatus");
const notification_model_1 = require("./notification.model");
const createNotification = async (payload) => {
    const result = await notification_model_1.Notification.create(payload);
    return result;
};
const getUserNotification = async (recipient, status, type) => {
    let filters = {};
    if (status && recipient && type) {
        filters.recipient = recipient;
        filters.status = status;
        filters.type = type;
    }
    else if (status && recipient) {
        filters.recipient = recipient;
        filters.status = status;
    }
    else if (recipient && type) {
        filters.recipient = recipient;
        filters.type = type;
    }
    else if (recipient) {
        filters.recipient = recipient;
    }
    const result = await notification_model_1.Notification.find(filters).sort({ createdAt: -1 });
    return result;
};
const updateNotification = async (id) => {
    const result = await notification_model_1.Notification.findOneAndUpdate({ _id: id }, { status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.SEEN }, {
        new: true,
    });
    return result;
};
exports.NotificationService = {
    createNotification,
    getUserNotification,
    updateNotification,
};
