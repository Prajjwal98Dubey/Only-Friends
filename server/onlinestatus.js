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

let onlineMap = new Map();

io.on("connection", (socket) => {
  socket.on("details", (payload) => {
    let { userName } = payload;
    onlineMap.set(userName, "online");
    io.emit("online_count", { count: onlineMap.size });
  });
  socket.on("early_disconnect", (payload) => {
    let { userName } = payload;
    onlineMap.delete(userName);
    io.emit("online_count", { count: onlineMap.size });
  });
  socket.on("disconnect", (payload) => {
    console.log("coming from client", payload);
  });
});

server.listen(8083, () =>
  console.log("online status server listening at 8083.")
);
