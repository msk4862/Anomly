import { Server } from "socket.io";
import { SOCKET_EVENTS } from "@/utils/Constants";
import { Message, TextMessage } from "@/utils/Message";
import {
  addUser,
  getCurrentUser,
  removeUser,
  getRoomUsers,
} from "@/utils/user";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server.io);
    res.socket.server.io = io;

    // Run when client connnects
    io.on("connection", (socket) => {
      const { CHAT_MESSAGE, JOIN_ROOM, ROOM_USERS, DISCONNECT } = SOCKET_EVENTS;

      // joining room
      socket.on(
        JOIN_ROOM,
        ({
          username,
          room,
        }: {
          username: TUser["username"];
          room: TUser["room"];
        }) => {
          socket.join(room);

          // add user to users list
          addUser(socket.id, username, room);

          // sent to single client connected client
          socket.emit(
            CHAT_MESSAGE,
            new TextMessage("CHAT_BOT", `Welcome to Anomly ${username}!`, "bot")
          );

          // Broasdcast to all user except client when a user is joined
          socket.broadcast
            .to(room)
            .emit(
              CHAT_MESSAGE,
              new TextMessage(
                "CHAT_BOT",
                `${username} has joined the room`,
                "bot"
              )
            );

          // send room users info
          io.to(room).emit(ROOM_USERS, {
            room,
            users: getRoomUsers(room),
          });
        }
      );

      /**
       * listen chat Message
       * @param  {SOCKET_EVENTS} CHAT_MESSAGE
       * @param  {Message} message Instance of message class
       */
      socket.on(CHAT_MESSAGE, (message: Message) => {
        var cur_user = getCurrentUser(socket.id);

        if (!cur_user) {
          return;
        }

        // emit this message to everyone
        io.to(cur_user.room).emit(CHAT_MESSAGE, message);
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
            new TextMessage("CHAT_BOT", `${username} has left the room`, "bot")
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
