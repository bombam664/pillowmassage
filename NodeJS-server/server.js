const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  socket.on("emit", function (data) {
    socket.broadcast.emit("message", { message: data.message });
  });
});

const port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log("Server is ready at " + port);
});
