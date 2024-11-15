import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let roomMap = new Map();

io.on("connection", (socket) => {
  socket.on("create-room", (payload) => {
    let roomId = [payload.sender, payload.receiver].sort().join("-");
    if (!roomMap.has(roomId)) {
      roomMap.set(roomId, true);
    }
    socket.join(roomId);
    console.log("this is coming from client", payload);
  });
  socket.on("chat-message", (payload) => {
    let roomId = [payload.sender, payload.receiver].sort().join("-");
    socket.broadcast.to(roomId).emit("chat-message", payload);
  });
});

server.listen(8082, () => console.log("chat server running at 8082."));
