import { useState, useEffect } from "react";
import io from "socket.io-client";

import RoomForm from "./RoomForm";
import ChatSection from "./ChatSection";
import { SOCKET_EVENTS } from "../../utils/Constants";
import Message from "../../utils/Message";

export const UserContext = React.createContext(null);

const ChatHome = () => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const [roomUsers, setRoomUsers] = useState([]);
    const [messages, setMessages] = useState([]);

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
    const initSocket = () => {
        var socket = io();

        const { CHAT_MESSAGE, ROOM_USERS } = SOCKET_EVENTS;

        // listens for incoming message from server
        // 1. chat messages
        socket.on(CHAT_MESSAGE, (message) => {
            setMessages((messages) => [...messages, message]);
        });
        // 2. set room users
        socket.on(ROOM_USERS, (info) => {
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
    const onJoin = (user) => {
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
        setSocket(null);
        socket.disconnect();
    };

    /**
     * Handles message sending by sending message to server
     * @param  {Message} Instance of class message
     */
    const sendMessage = (message) => {
        // emit message to server
        socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, message);
    };

    return (
        <section style={{ height: "100vh" }}>
            {!user ? (
                <RoomForm handleSubmit={onJoin} />
            ) : (
                <UserContext.Provider value={user}>
                    <ChatSection
                        onSend={sendMessage}
                        roomUsers={roomUsers}
                        messages={messages}
                        onLeave={onLeave}
                    />
                </UserContext.Provider>
            )}
        </section>
    );
};

export default ChatHome;
