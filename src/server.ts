import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "socket.io";
import { createServer } from "http";
import { Notification } from "./modules/notification/notification.model";
import { ENUM_NOTIFICATION_STATUS } from "./enums/NotificationStatus";
import { NotificationCreateResponse } from "./modules/notification/notification.interface";
import { Message } from "./modules/messages/messages.model";
import { CreateTeam } from "./modules/team/createTeam/createTeam.model";

const options = {
  autoIndex: true,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["polling", "websocket"],
  pingInterval: 25000,
  pingTimeout: 60000,
  upgradeTimeout: 30000,
});

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register", (email: string) => {
    users[email] = socket.id;
    console.log(`User ${email} registered with socket ID ${socket.id}`);
  });

  socket.on("privateMessage", async ({ toEmail, message, timestamp }) => {
    const toSocketId = users[toEmail];
    const senderEmail = Object.keys(users).find(
      (key) => users[key] === socket.id
    );

    if (!senderEmail) {
      console.log(`Sender email not found for socket ID: ${socket.id}`);
      return;
    }

    console.log(
      `${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`
    );
    try {
      // Save the message to the database regardless of recipient's connection status
      const savedMessage = await Message.create({
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
    } catch (error) {
      console.log(error, "message created error");
    }
  });

  socket.on(
    "notification",
    async ({ toEmail, message, timestamp, _id, type }) => {
      const toSocketId = users[toEmail];
      const senderEmail = Object.keys(users).find(
        (key) => users[key] === socket.id
      );

      if (!senderEmail) {
        console.log(`Sender email not found for socket ID: ${socket.id}`);
        return;
      }

      try {
        const notification = await Notification.create({
          recipient: toEmail,
          sender: senderEmail,
          message: message,
          status: ENUM_NOTIFICATION_STATUS.UNSEEN,
          type: type,
        });

        const notificationResponse: NotificationCreateResponse = {
          success: true,
          statusCode: 200,
          message: "Notification saved successfully",
          data: {
            ...notification.toObject(), // Convert Mongoose Document to plain object
          },
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
      } catch (error) {
        console.error("Failed to create notification:", error);
        socket.emit("notificationError", "Failed to create notification");
      }
    }
  );
  socket.on("teamRequest", async ({ toEmail, message, type, timestamp }) => {
    const toSocketId = users[toEmail];
    const senderEmail = Object.keys(users).find(
      (key) => users[key] === socket.id
    );
    console.log();

    if (!senderEmail) {
      console.log(`Sender email not found for socket ID: ${socket.id}`);
      return;
    }

    console.log(
      `${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`
    );

    try {
      const notification = await Notification.create({
        recipient: toEmail,
        sender: senderEmail,
        message: message,
        status: ENUM_NOTIFICATION_STATUS.UNSEEN,
        type: type,
      });

      const notificationResponse: NotificationCreateResponse = {
        success: true,
        statusCode: 200,
        message: "Notification saved successfully",
        data: {
          ...notification.toObject(), // Convert Mongoose Document to plain object
        },
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
    } catch (error) {
      console.error("Failed to create notification:", error);
      socket.emit("notificationError", "Failed to create notification");
    }
  });
  socket.on(
    "JoinTeamRequest",
    async ({ toEmail, message, timestamp, type }) => {
      const toSocketId = users[toEmail];
      const senderEmail = Object.keys(users).find(
        (key) => users[key] === socket.id
      );
      console.log();

      if (!senderEmail) {
        console.log(`Sender email not found for socket ID: ${socket.id}`);
        return;
      }

      console.log(
        `${toSocketId} send message to ${toEmail}: ${message} from ${senderEmail}`
      );

      try {
        const notification = await Notification.create({
          recipient: toEmail,
          sender: senderEmail,
          message: message,
          status: ENUM_NOTIFICATION_STATUS.UNSEEN,
          type: type,
        });

        const notificationResponse: NotificationCreateResponse = {
          success: true,
          statusCode: 200,
          message: "Notification saved successfully",
          data: {
            ...notification.toObject(), // Convert Mongoose Document to plain object
          },
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
      } catch (error) {
        console.error("Failed to create notification:", error);
        socket.emit("notificationError", "Failed to create notification");
      }
    }
  );
  socket.on(
    "updateCreateTeam",
    async ({ toEmails, message, timestamp, type }) => {
      // const toSocketId = users[toEmail];
      const senderEmail = Object.keys(users).find(
        (key) => users[key] === socket.id
      );
      console.log();

      if (!senderEmail) {
        console.log(`Sender email not found for socket ID: ${socket.id}`);
        return;
      }

      try {
        const notifications = toEmails.map(async (toEmail: string) => {
          //  const toEmail = joinPerson.joinTeamId.email;
          const toSocketId = users[toEmail];

          const notification = await Notification.create({
            recipient: toEmail,
            sender: senderEmail,
            message: message,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            type: type,
          });

          const notificationResponse: NotificationCreateResponse = {
            success: true,
            statusCode: 200,
            message: "Notification saved successfully",
            data: {
              ...notification.toObject(),
            },
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
      } catch (error) {
        console.error("Failed to create notification:", error);
        socket.emit("notificationError", "Failed to create notification");
      }
    }
  );
  socket.on(
    "deleteCreateTeam",
    async ({ toEmails, message, timestamp, type }) => {
      // const toSocketId = users[toEmail];
      const senderEmail = Object.keys(users).find(
        (key) => users[key] === socket.id
      );
      console.log();

      if (!senderEmail) {
        console.log(`Sender email not found for socket ID: ${socket.id}`);
        return;
      }

      try {
        const notifications = toEmails.map(async (toEmail: string) => {
          //  const toEmail = joinPerson.joinTeamId.email;
          const toSocketId = users[toEmail];

          const notification = await Notification.create({
            recipient: toEmail,
            sender: senderEmail,
            message: message,
            status: ENUM_NOTIFICATION_STATUS.UNSEEN,
            type: type,
          });

          const notificationResponse: NotificationCreateResponse = {
            success: true,
            statusCode: 200,
            message: "Notification saved successfully",
            data: {
              ...notification.toObject(),
            },
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
      } catch (error) {
        console.error("Failed to create notification:", error);
        socket.emit("notificationError", "Failed to create notification");
      }
    }
  );
  socket.on("disconnect", (reason) => {
    console.log(
      `A user disconnected for ${reason} - Socket ID: ${
        socket.id
      } - Time: ${new Date().toISOString()}`
    );
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
    await mongoose.connect(config.database_url as string, options);
    console.log("Database connected successfully");

    httpServer.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect: ${error}`);
  }
}

bootstrap();
