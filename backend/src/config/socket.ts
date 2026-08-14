import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join:room", (room: string) => {
      socket.join(room);
      console.log(`${socket.id} joined room: ${room}`);
    });

    socket.on("leave:room", (room: string) => {
      socket.leave(room);
      console.log(`${socket.id} left room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getSocket(): Server {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
}
