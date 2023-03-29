import { Server } from "socket.io";
import { io as client } from "socket.io-client";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

httpServer.listen(3001, () => {
  console.log("Serveur WebSocket démarré sur le port 3001");
});

function authenticateSocket(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: no token provided"));
  }

  jwt.verify(token, config.secretToken, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error: invalid token"));
    }

    // Ajouter les informations d'authentification à l'objet socket
    socket.user = decoded;
    next();
  });
}

io.use((socket, next) => {
  authenticateSocket(socket, next);
});

io.on("connection", (socket) => {
  // join a room
  socket.on("join", (roomId) => {
    console.log(roomId);
    socket.join(roomId);
  });

  // leave a room
  socket.on("leave", (roomId) => {
    socket.leave(roomId);
  });

  // broadcast message to a room
  socket.on("message", (data) => {
    const { roomId, message } = data;
    io.to(roomId).emit("message", message);
    console.log("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// CLIENT
// const socket = client("ws://localhost:3001");

// socket.on("message", (data) => {
//   console.log("Message : ", data);
// });

// socket.emit("join", "640b046cb2a8393bf10f4414");

export { io };
