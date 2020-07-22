const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV != "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const { SOCKET_EVENTS, SOCKET_MESSAGES } = require("../utils/Constants");
const formatMessage = require("../utils/MessageUtil");

const PORT = 3000 || process.env.PORT;

// Run when client connnects
io.on("connect", (socket) => {
    const { CHAT_BOT, CHAT_MESSAGE } = SOCKET_EVENTS;
    const { WELCOME, JOINED, DISCONNECED } = SOCKET_MESSAGES;

    // sent to single client connected client
    socket.emit(CHAT_BOT, formatMessage(CHAT_BOT, WELCOME));

    // Broasdcast to all user except client
    socket.broadcast.emit(CHAT_BOT, formatMessage(CHAT_BOT, JOINED));

    // Broadcast
    socket.on("disconnect", () => {
        // sent to all
        io.emit(CHAT_BOT, formatMessage(CHAT_BOT, DISCONNECED));
    });

    // listen chat Message
    socket.on(CHAT_MESSAGE, (msg) => {
        // emit this message to everyone
        io.emit(CHAT_MESSAGE, formatMessage("user", msg));
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
