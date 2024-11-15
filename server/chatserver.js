import express from "express";
import http from "http";
import { Server } from "socket.io";
import appPool from "./db/connectdb.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let roomMap = new Map();

io.on("connection", (socket) => {
  socket.on("create-room", async (payload) => {
    let roomId = [payload.sender, payload.receiver].sort().join("-");
    let isRoomPresent;
    isRoomPresent = await appPool.query(
      "SELECT * FROM CHAT_ROOM WHERE ROOM_ID = $1",
      [roomId]
    );
    if (isRoomPresent.rows.length === 0) {
      await appPool.query(
        "INSERT INTO CHAT_ROOM (USER1,USER2,ROOM_ID) VALUES ($1,$2,$3)",
        [payload.sender, payload.receiver, roomId]
      );
    }
    if (!roomMap.has(roomId)) {
      roomMap.set(roomId, true);
    }
    socket.join(roomId);
  });
  socket.on("chat-message", (payload) => {
    let roomId = [payload.sender, payload.receiver].sort().join("-");
    socket.broadcast.to(roomId).emit("chat-message", payload);
  });
});

server.listen(8082, () => console.log("chat server running at 8082."));
