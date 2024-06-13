import mongoose, { Types } from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "socket.io";
import { createServer } from "http";
import { Message } from "./modules/messages/messages.model";
import { MessageService } from "./modules/messages/messages.service";
import ApiError from "./error/handleApiError";

const options = {
  autoIndex: true,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["polling", "websocket"],
  pingInterval: 25000, // Send a ping every 25 seconds
  pingTimeout: 60000, // Consider the connection closed if no pong is received within 60 seconds
});

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
  // console.log(`${socket.id} user just connected`);

  socket.on("register", (email: string) => {
    users[email] = socket.id;
    //console.log(`User ${email} registered with socket ID ${socket.id}`);
  });

  socket.on("privateMessage", async ({ toEmail, message, timestamp }) => {
    const toSocketId = users[toEmail];
    const senderId = Object.keys(users).find((key) => users[key] === socket.id);
    console.log(socket.id, "user id");
    console.log(toSocketId, "recipinet id");
    console.log(toEmail, message, "message history");
    if (senderId) {
      socket.to(toSocketId).emit("privateMessage", {
        from: senderId, // Find the email of the sender
        message,
        timestamp,
      });
      //console.log(senderId, message, "check user message");
      socket.to(toSocketId).emit("messageNotification", {
        from: senderId,
        message,
      });
      // try {
      //   await MessageService.createMessage({
      //     sender: senderId,
      //     recipient: toEmail,
      //     message,
      //   });
      // } catch (error: any) {
      //   throw new ApiError(400, error.message);
      // }
    } else {
      socket.emit("userNotFound", `User ${toEmail} is not connected`);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`A user disconnected for ${reason}`, socket.id);

    for (const email in users) {
      if (users[email] === socket.id) {
        delete users[email];
        break;
      }
    }
  });

  socket.on("error", (error) => {
    //  console.error(`Error from socket ${socket.id}: ${error}`);
  });
});

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string, options);
    console.log(`database connect successfully`);

    httpServer.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`fail to connect the error is:${error}`);
  }
}
boostrap();
