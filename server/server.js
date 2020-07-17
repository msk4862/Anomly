const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const next = require("next");
const dev = process.env.NODE_ENV != "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const PORT = 3000 || process.env.PORT;
const { SOCKET_EVENTS, SOCKET_MESSAGES } = require("../utils/Constants");

// Run when client connnects
io.on("connect", (socket) => {
    // const { SOCKET_MESSAGES, SOCKET_EVENTS } = SOCKET_CONST;

    // sent to single client connected client
    socket.emit(SOCKET_EVENTS.EVENT, SOCKET_MESSAGES.WELCOME);

    // Broasdcast to all user except client
    socket.broadcast.emit(SOCKET_EVENTS.EVENT, SOCKET_MESSAGES.JOINED);

    // Broadcast
    socket.on("disconnect", () => {
        // sent to all
        io.emit(SOCKET_EVENTS.EVENT, SOCKET_MESSAGES.DISCONNECED);
    });

    // listen chat Message
    socket.on(SOCKET_EVENTS.CHAT_MESSAGE, (msg) => {
        // emit this message to everyone
        io.emit(SOCKET_EVENTS.CHAT_MESSAGE, msg);
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
