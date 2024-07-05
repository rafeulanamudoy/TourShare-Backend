"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const messages_model_1 = require("./messages.model");
const createMessage = async (payload) => {
    const result = await messages_model_1.Message.create(payload);
    return result;
};
const getMessages = async (senderId, recipientId) => {
    const messages = await messages_model_1.Message.find({
        $or: [
            { sender: senderId, recipient: recipientId },
            { sender: recipientId, recipient: senderId },
        ],
    }).sort({ createdAt: 1 });
    return messages;
};
exports.MessageService = {
    createMessage,
    getMessages,
};
