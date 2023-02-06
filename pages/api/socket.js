import { Server } from "socket.io";

import { SOCKET_EVENTS } from "../../utils/Constants";
import { Message, TextMessage } from "../../utils/Message";
import {
    addUser,
    getCurrentUser,
    removeUser,
    getRoomUsers,
} from "../../utils/user";

export default (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
    } else {
        console.log("Socket is initializing");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        // Run when client connnects
        io.on("connection", (socket) => {
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
                    new TextMessage(
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
                        new TextMessage(
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
                        new TextMessage(
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
    }
    res.end();
};
