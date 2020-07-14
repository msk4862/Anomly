import { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatForm from "./ChatForm";
import ChatPage from "./ChatPage";
import "../styles/chathome.scss";

const ChatHome = () => {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);

    // Initializing Socket
    useEffect(() => {
        var socket = io();
        setSocket(socket);
    }, []);

    useEffect(() => {
        if (socket) {
            initSocket();
        }
    }, [socket]);

    // handling socket events
    const initSocket = () => {
        // listens for incoming message from server
        socket.on("message", (msg) => {
            console.log(msg);
        });

        // socket.on("disconnect", )
    };

    /*
        On join from chat form   
        @params: {name:string, room:string}
    */
    const onJoin = (user) => {
        console.log(user);
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
                <ChatPage onSend={sendMessage} />
            )}
        </section>
    );
};

export default ChatHome;
