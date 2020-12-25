import { useContext } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UserContext } from "./ChatHome";
import Message from "../../utils/Message";
import "../../styles/chatmessage.scss";

const ChatMessage = ({ message }) => {
    dayjs.extend(customParseFormat);

    // current user
    const userInfo = useContext(UserContext);
    const { user, chatMessage, time, type } = message;

    /**
     * Render text messages
     */
    const renderChatMessage = () => {
        if (type === Message.BOT) {
            return (
                <div className="message message-bot text-center">
                    <small>{chatMessage}</small>
                </div>
            );
        }

        return userInfo.username === user ? (
            <div className="message message-chat message-chat-self tri-right">
                <p>
                    <small>You</small>
                    <small>{dayjs(time).format("h:m:s a")}</small>
                </p>
                <p>{chatMessage}</p>
            </div>
        ) : (
            <div className="message message-chat tri-left">
                <p>
                    <small>{user}</small>
                    <small>{dayjs(time).format("h:m:s a")}</small>
                </p>
                <p>{chatMessage}</p>
            </div>
        );
    };

    return <>{renderChatMessage()}</>;
};

export default ChatMessage;
