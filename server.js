const app = require("express")();
const server = require("http").createServer(app);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

var PORT = process.env.PORT || 3000;

const { SOCKET_EVENTS } = require("./utils/Constants");
const Message = require("./utils/Message");
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

    const io = require("socket.io").listen(server);

    // Run when client connnects
    io.on("connect", (socket) => {
        const {
            CHAT_MESSAGE,
            JOIN_ROOM,
            ROOM_USERS,
            DISCONNECT,
        } = SOCKET_EVENTS;

        // joining room
        socket.on(JOIN_ROOM, ({ username, room }) => {
            socket.join(room);

            // add user to users list
            addUser(socket.id, username, room);

            // sent to single client connected client
            socket.emit(
                CHAT_MESSAGE,
                new Message(
                    "CHAT_BOT",
                    `Welcome to Anomly ${username}!`,
                    Message.BOT
                )
                // formatMessage(CHAT_BOT, `Welcome to Anomly ${username}!`)
            );

            // Broasdcast to all user except client when a user is joined
            socket.broadcast
                .to(room)
                .emit(
                    CHAT_MESSAGE,
                    new Message(
                        "CHAT_BOT",
                        `${username} has joined the room`,
                        Message.BOT
                    )
                );

            // send room users info
            io.to(room).emit(ROOM_USERS, {
                room: room,
                users: getRoomUsers(room),
            });
        });

        /**
         * listen chat Message
         * @param  {SOCKET_EVENTS} CHAT_MESSAGE
         * @param  {Message} message Instance of message class
         */
        socket.on(CHAT_MESSAGE, (message) => {
            var cur_user = getCurrentUser(socket.id);

            const { room } = cur_user;

            // emit this message to everyone
            io.to(room).emit(CHAT_MESSAGE, message);
        });

        // Broadcast
        socket.on(DISCONNECT, () => {
            var cur_user = getCurrentUser(socket.id);

            if (cur_user) {
                const { id, username, room } = cur_user;
                // sent to all
                io.to(room).emit(
                    CHAT_MESSAGE,
                    // formatMessage(CHAT_BOT, `${username} has left the room`)
                    new Message(
                        "CHAT_BOT",
                        `${username} has left the room`,
                        Message.BOT
                    )
                );
                // remove user from list of current online users
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
