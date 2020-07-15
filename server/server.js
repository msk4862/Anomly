const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const next = require("next");
const dev = process.env.NODE_ENV != "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const PORT = 3000 || process.env.PORT;
// const MESSAGES = require("./utils/Constants").MESSAGES;

// Run when client connnects
io.on("connect", (socket) => {
    // sent to single client connected client
    socket.emit("message", "Welcome to Anomly!");

    // Broasdcast to all user except client
    socket.broadcast.emit("message", "A user joined the chat");

    // Broadcast
    socket.on("disconnect", () => {
        // sent to all
        io.emit("message", "user left the chat");
    });

    // listen chat Message
    socket.on("chatMessage", (msg) => {
        // emit this message to everyone
        io.emit("message", msg);
    });
});

// custom nextJs server
nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) {
            console.log("Something went wrong");
            console.log(err);
        }
        console.log(`Ready on port http://localhost:${PORT}`);
    });
});
