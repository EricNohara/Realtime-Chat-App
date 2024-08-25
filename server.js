const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat msg", (data) => {
    socket.to(data.roomID).emit("chat msg", data.msg);
  });

  socket.on("join room", (roomID) => {
    socket.join(roomID);
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
