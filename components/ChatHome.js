import { useState, useEffect } from "react";
import io from "socket.io-client";

import ChatForm from "./ChatForm";
import ChatPage from "./ChatPage";
import { SOCKET_EVENTS } from "../utils/Constants";
import "../styles/chathome.scss";

const SOCKET_URI = "http://localhost:3000";

const ChatHome = () => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);

    // Initializing Socket
    useEffect(() => {
        initSocket();
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    /**
     * Handling socket events
     */
    const initSocket = () => {
        var socket = io.connect(SOCKET_URI);

        const { CHAT_BOT, CHAT_MESSAGE } = SOCKET_EVENTS;
        // listens for incoming message from server
        // 1. bot messages
        socket.on(CHAT_BOT, (msg) => {
            const message = {
                type: CHAT_BOT,
                text: msg.text,
            };
            setMessages((messages) => [...messages, message]);
        });
        // 2. chat messages
        socket.on(CHAT_MESSAGE, (msg) => {
            const message = {
                type: CHAT_MESSAGE,
                user: msg.user,
                time: msg.time,
                text: msg.text,
            };
            setMessages((messages) => [...messages, message]);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        setSocket(socket);
    };

    /**
     * On join from chat form
     * @param  {{{name:string, room:string}}} user
     */
    const onJoin = (user) => {
        setUser(user);
    };

    /**
     * Handles message sending by sending message to server
     * @param  {String} message
     */
    const sendMessage = (message) => {
        event.preventDefault();

        // emit message to server
        socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, message);
    };

    return (
        <section className="chat-home">
            {!user ? (
                <ChatForm handleSubmit={onJoin} />
            ) : (
                <ChatPage onSend={sendMessage} messages={messages} />
            )}
        </section>
    );
};

export default ChatHome;
