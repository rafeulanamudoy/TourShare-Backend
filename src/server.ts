import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "socket.io";
import { createServer } from "http";

const options = {
  autoIndex: true,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["polling", "websocket"],
  pingInterval: 25000, // Increased ping interval
  pingTimeout: 60000, // Increased ping timeout
  upgradeTimeout: 30000, // Increased upgrade timeout
});

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register", (email: string) => {
    users[email] = socket.id;
    console.log(`User ${email} registered with socket ID ${socket.id}`);
  });

  socket.on("privateMessage", ({ toEmail, message, timestamp }) => {
    const toSocketId = users[toEmail];
    const senderId = Object.keys(users).find((key) => users[key] === socket.id);
    if (toSocketId && senderId) {
      socket.to(toSocketId).emit("privateMessage", {
        from: senderId,
        message,
        timestamp,
      });
      socket.to(toSocketId).emit("messageNotification", {
        from: senderId,
        message,
      });
    } else {
      socket.emit("userNotFound", `User ${toEmail} is not connected`);
    }
  });

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

async function boostrap() {
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

boostrap();
