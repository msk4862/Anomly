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
    const [messages, setMessages] = useState(["asasas", "asasas"]);

    // Initializing Socket
    useEffect(() => {
        initSocket();
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    // handling socket events
    const initSocket = () => {
        var socket = io.connect(SOCKET_URI);

        // listens for incoming message from server
        socket.on(SOCKET_EVENTS.MESSAGE, (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        setSocket(socket);
    };

    /*
        On join from chat form   
        @params: {name:string, room:string}
    */
    const onJoin = (user) => {
        setUser(user);
    };

    /*
        handle message sending by sending message to server
        @params: message:string
    */
    const sendMessage = (message) => {
        event.preventDefault();

        // emit message to server
        socket.emit("chatMessage", message);
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
