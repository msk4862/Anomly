import { useContext } from "react";
import { UserContext } from "./ChatHome";
import { SOCKET_EVENTS } from "../../utils/Constants";
import "../../styles/chatmessage.scss";

const ChatMessage = ({ message }) => {
    const user = useContext(UserContext);

    const renderChatMessage = () => {
        return user.username === message.user ? (
            <div className="message message-chat message-chat-you tri-right">
                <p>
                    <small>You:</small>
                    <small>{message.time}</small>
                </p>
                <p>{message.text}</p>
            </div>
        ) : (
            <div className="message message-chat tri-left">
                <p>
                    <small>{message.user}</small>
                    <small>{message.time}</small>
                </p>
                <p>{message.text}</p>
            </div>
        );
    };

    const renderEventMessage = () => {
        return (
            <div className="message message-bot text-center">
                <p>{message.text}</p>
            </div>
        );
    };

    return (
        <>
            {message.type === SOCKET_EVENTS.CHAT_BOT
                ? renderEventMessage()
                : renderChatMessage()}
        </>
    );
};

export default ChatMessage;
