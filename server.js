const app = require("express")();
const server = require("http").createServer(app);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

var PORT = process.env.PORT || 3000;

const { SOCKET_EVENTS, SOCKET_MESSAGES } = require("./utils/Constants");
const formatMessage = require("./utils/MessageUtil");
const {
    addUser,
    getCurrentUser,
    removeUser,
    getRoomUsers,
} = require("./utils/user");

// const io = null;
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
        // require("./socket")(server);
        console.log(`Ready on port http://localhost:${PORT}`);
    });

    const io = require("socket.io")(server);

    // Run when client connnects
    io.on("connect", (socket) => {
        const {
            CHAT_BOT,
            CHAT_MESSAGE,
            JOIN_ROOM,
            ROOM_USERS,
            DISCONNECT,
        } = SOCKET_EVENTS;

        // joining room
        socket.on(JOIN_ROOM, ({ username, room }) => {
            socket.join(room);

            addUser(socket.id, username, room);

            // sent to single client connected client
            socket.emit(
                CHAT_BOT,
                formatMessage(CHAT_BOT, `Welcome to Anomly ${username}!`)
            );

            // Broasdcast to all user except client when a user is joined
            socket.broadcast
                .to(room)
                .emit(
                    CHAT_BOT,
                    formatMessage(CHAT_BOT, `${username} has joined the room`)
                );

            // send room users info
            io.to(room).emit(ROOM_USERS, {
                room: room,
                users: getRoomUsers(room),
            });
        });

        // listen chat Message
        socket.on(CHAT_MESSAGE, (msg) => {
            var cur_user = getCurrentUser(socket.id);

            const { username, room } = cur_user;

            // emit this message to everyone
            io.to(room).emit(CHAT_MESSAGE, formatMessage(username, msg));
        });

        // Broadcast
        socket.on(DISCONNECT, () => {
            var cur_user = getCurrentUser(socket.id);

            if (cur_user) {
                const { id, username, room } = cur_user;
                // sent to all
                io.to(room).emit(
                    CHAT_BOT,
                    formatMessage(CHAT_BOT, `${username} has left the room`)
                );
                removeUser(id);

                // send room users info
                io.to(room).emit(ROOM_USERS, {
                    room: room,
                    users: getRoomUsers(room),
                });
            }
        });
    });
});
