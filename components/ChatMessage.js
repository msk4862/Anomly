import { SOCKET_EVENTS } from "../utils/Constants";
import "../styles/chatmessage.scss";

const ChatMessage = ({ message }) => {
    const renderChatMessage = () => {
        return (
            <div className="chat-message">
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
            <div className="bot-message text-center">
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
