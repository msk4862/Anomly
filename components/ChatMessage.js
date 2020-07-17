import { SOCKET_EVENTS } from "../utils/Constants";
import "../styles/chatmessage.scss";

const ChatMessage = ({ message }) => {
    const renderChatMessage = () => {
        return (
            <div className="message">
                <p>
                    <small>Shaoib</small>
                    <small>9:15 A.M.</small>
                </p>
                <p>{message.content}</p>
            </div>
        );
    };

    const renderEventMessage = () => {
        return (
            <div className="message">
                <p>{message.content}</p>
            </div>
        );
    };

    return (
        <>
            {message.type === SOCKET_EVENTS.EVENT
                ? renderEventMessage()
                : renderChatMessage()}
        </>
    );
};

export default ChatMessage;
