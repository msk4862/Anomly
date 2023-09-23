import { useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";

import RoomForm from "./RoomForm";
import ChatSection from "./ChatSection";
import { SOCKET_EVENTS } from "@/utils/Constants";
import { Message } from "@/utils/Message";
import { UserContext } from "@/context/UserContext";

const ChatHome = () => {
  const [socket, setSocket] = useState<Socket>();
  const [roomUsers, setRoomUsers] = useState<TUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user, setUser } = useContext(UserContext);

  // Initializing Socket
  useEffect(() => {
    if (!socket) {
      initSocket();
    }
  }, [socket]);

  /**
   * Initializing socket
   * Handling socket events
   */
  const initSocket = async () => {
    // initialize Socket-io server
    await fetch("/api/socket");
    let socket = io();

    const { CHAT_MESSAGE, ROOM_USERS } = SOCKET_EVENTS;

    // listens for incoming message from server
    // 1. chat messages
    socket.on<string>(CHAT_MESSAGE, (message: Message) => {
      setMessages((messages) => [...messages, message]);
    });
    // 2. set room users
    socket.on(ROOM_USERS, (info: { room: string; users: TUser[] }) => {
      setRoomUsers(info.users);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    setSocket(socket);
  };

  /**
   * On join from chat form
   * @param  {username:string, room:string} user
   */
  const onJoin = (user: TUserInfo) => {
    if (!socket) {
      return;
    }
    setUser(user);

    const { username, room } = user;

    // join room
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { username, room });
  };

  /**
   * On user have left the room
   */
  const onLeave = () => {
    setUser(null);
    setMessages([]);
    setSocket(undefined);
    socket?.disconnect();
  };

  /**
   * Handles message sending by sending message to server
   * @param  {Message} Instance of class message
   */
  const sendMessage = (message: Message) => {
    // emit message to server
    socket?.emit(SOCKET_EVENTS.CHAT_MESSAGE, message);
  };

  return (
    <section style={{ height: "100vh" }}>
      {!user ? (
        <RoomForm handleSubmit={onJoin} />
      ) : (
        <ChatSection
          onSend={sendMessage}
          roomUsers={roomUsers}
          messages={messages}
          onLeave={onLeave}
        />
      )}
    </section>
  );
};

export default ChatHome;
