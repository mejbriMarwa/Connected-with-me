const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const cors = require("cors");
app.use(cors());
app.use(express.json())

// database config
const connectDB = require("./config/connectDB");
connectDB();

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
// router
app.use("/api/user", require("./routes/userRoute"));

// config server
server.listen(process.env.PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on port ${process.env.PORT}`)
);
