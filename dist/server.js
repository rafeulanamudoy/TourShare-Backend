"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const notification_model_1 = require("./modules/notification/notification.model");
const NotificationStatus_1 = require("./enums/NotificationStatus");
const messages_model_1 = require("./modules/messages/messages.model");
const options = {
    autoIndex: true,
};
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
    transports: ["polling", "websocket"],
    pingInterval: 25000,
    pingTimeout: 60000,
    upgradeTimeout: 30000,
});
const users = {};
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("register", (email) => {
        users[email] = socket.id;
        console.log(`User ${email} registered with socket ID ${socket.id}`);
    });
    socket.on("privateMessage", async ({ toEmail, message, timestamp }) => {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        console.log(`${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`);
        try {
            // Save the message to the database regardless of recipient's connection status
            const savedMessage = await messages_model_1.Message.create({
                sender: senderEmail,
                message: message,
                recipient: toEmail,
            });
            if (toSocketId) {
                socket.to(toSocketId).emit("privateMessage", {
                    from: senderEmail,
                    message,
                    timestamp,
                });
            }
        }
        catch (error) {
            console.log(error, "message created error");
        }
    });
    socket.on("notification", async ({ toEmail, message, timestamp, _id, type }) => {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        try {
            const notification = await notification_model_1.Notification.create({
                recipient: toEmail,
                sender: senderEmail,
                message: message,
                status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                type: type,
            });
            const notificationResponse = {
                success: true,
                statusCode: 200,
                message: "Notification saved successfully",
                data: Object.assign({}, notification.toObject()),
            };
            const notificationId = notificationResponse.data._id;
            if (toSocketId) {
                socket.to(toSocketId).emit("notification", {
                    from: senderEmail,
                    message,
                    timestamp,
                    _id: notificationId,
                    type: type,
                });
            }
        }
        catch (error) {
            console.error("Failed to create notification:", error);
            socket.emit("notificationError", "Failed to create notification");
        }
    });
    socket.on("teamRequest", async ({ toEmail, message, type, timestamp }) => {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        console.log();
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        console.log(`${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`);
        try {
            const notification = await notification_model_1.Notification.create({
                recipient: toEmail,
                sender: senderEmail,
                message: message,
                status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                type: type,
            });
            const notificationResponse = {
                success: true,
                statusCode: 200,
                message: "Notification saved successfully",
                data: Object.assign({}, notification.toObject()),
            };
            const notificationId = notificationResponse.data._id;
            if (toSocketId) {
                socket.to(toSocketId).emit("teamRequest", {
                    from: senderEmail,
                    message,
                    timestamp,
                    _id: notificationId,
                    type: type,
                });
            }
        }
        catch (error) {
            console.error("Failed to create notification:", error);
            socket.emit("notificationError", "Failed to create notification");
        }
    });
    socket.on("JoinTeamRequest", async ({ toEmail, message, timestamp, type }) => {
        const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        console.log();
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        console.log(`${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`);
        try {
            const notification = await notification_model_1.Notification.create({
                recipient: toEmail,
                sender: senderEmail,
                message: message,
                status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                type: type,
            });
            const notificationResponse = {
                success: true,
                statusCode: 200,
                message: "Notification saved successfully",
                data: Object.assign({}, notification.toObject()),
            };
            const notificationId = notificationResponse.data._id;
            if (toSocketId) {
                socket.to(toSocketId).emit("JoinTeamRequest", {
                    from: senderEmail,
                    message,
                    timestamp,
                    _id: notificationId,
                    type: type,
                });
            }
        }
        catch (error) {
            console.error("Failed to create notification:", error);
            socket.emit("notificationError", "Failed to create notification");
        }
    });
    socket.on("updateCreateTeam", async ({ toEmails, message, timestamp, type }) => {
        // const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        console.log();
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        try {
            const notifications = toEmails.map(async (toEmail) => {
                //  const toEmail = joinPerson.joinTeamId.email;
                const toSocketId = users[toEmail];
                const notification = await notification_model_1.Notification.create({
                    recipient: toEmail,
                    sender: senderEmail,
                    message: message,
                    status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                    type: type,
                });
                const notificationResponse = {
                    success: true,
                    statusCode: 200,
                    message: "Notification saved successfully",
                    data: Object.assign({}, notification.toObject()),
                };
                const notificationId = notificationResponse.data._id;
                if (toSocketId) {
                    socket.to(toSocketId).emit("updateCreateTeam", {
                        from: senderEmail,
                        message,
                        timestamp,
                        _id: notificationId,
                        type: type,
                    });
                }
            });
            await Promise.all(notifications);
        }
        catch (error) {
            console.error("Failed to create notification:", error);
            socket.emit("notificationError", "Failed to create notification");
        }
    });
    socket.on("deleteCreateTeam", async ({ toEmails, message, timestamp, type }) => {
        // const toSocketId = users[toEmail];
        const senderEmail = Object.keys(users).find((key) => users[key] === socket.id);
        console.log();
        if (!senderEmail) {
            console.log(`Sender email not found for socket ID: ${socket.id}`);
            return;
        }
        try {
            const notifications = toEmails.map(async (toEmail) => {
                //  const toEmail = joinPerson.joinTeamId.email;
                const toSocketId = users[toEmail];
                const notification = await notification_model_1.Notification.create({
                    recipient: toEmail,
                    sender: senderEmail,
                    message: message,
                    status: NotificationStatus_1.ENUM_NOTIFICATION_STATUS.UNSEEN,
                    type: type,
                });
                const notificationResponse = {
                    success: true,
                    statusCode: 200,
                    message: "Notification saved successfully",
                    data: Object.assign({}, notification.toObject()),
                };
                const notificationId = notificationResponse.data._id;
                if (toSocketId) {
                    socket.to(toSocketId).emit("deleteCreateTeam", {
                        from: senderEmail,
                        message,
                        timestamp,
                        _id: notificationId,
                        type: type,
                    });
                }
            });
            await Promise.all(notifications);
        }
        catch (error) {
            console.error("Failed to create notification:", error);
            socket.emit("notificationError", "Failed to create notification");
        }
    });
    socket.on("disconnect", (reason) => {
        console.log(`A user disconnected for ${reason} - Socket ID: ${socket.id} - Time: ${new Date().toISOString()}`);
        for (const email in users) {
            if (users[email] === socket.id) {
                delete users[email];
                break;
            }
        }
    });
    socket.on("error", (error) => {
        console.error(`Error from socket ${socket.id}: ${error}`);
    });
});
async function bootstrap() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url, options);
        console.log("Database connected successfully");
        httpServer.listen(config_1.default.port, () => {
            console.log(`App listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(`Failed to connect: ${error}`);
    }
}
bootstrap();
