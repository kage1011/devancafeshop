import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  "http://10.0.2.2:3000";

let socket: Socket | null = null;

export function connectSocket() {

  if (socket?.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"]
  });

  socket.on("connect", () => {
    console.log(
      "Socket connected:",
      socket?.id
    );
  });

  socket.on("disconnect", () => {
    console.log(
      "Socket disconnected"
    );
  });

  return socket;
}

export function disconnectSocket() {

  if (socket) {
    socket.disconnect();
    socket = null;
  }

}

export function getSocket() {
  return socket;
}