import { useContext } from "react";
import { UserContext } from "./ChatHome";
import { Message } from "../../utils/Message";
import "../../styles/chatmessage.scss";
import MessageHeader from "./MessageHeader";

const ChatMessage = ({ message }) => {
    // current user
    const userInfo = useContext(UserContext);

    const { user, type, time } = message;
    const selfClass = userInfo.username === user ? "message-chat-self" : "";

    /**
     * Render file messages using their URL
     */
    const renderFileMessage = () => {
        const { fileUrl, fileName } = message;

        switch (type) {
            case Message.IMAGE:
                return (
                    <div
                        className={`message message-chat message-media ${selfClass}`}>
                        <MessageHeader
                            isCurrentUser={selfClass === "" ? false : true}
                            user={user}
                            time={time}
                        />
                        <img
                            className="chat-image"
                            src={fileUrl}
                            alt={user + " " + time}
                        />
                    </div>
                );

            case Message.VIDEO:
                return (
                    <div
                        className={`message message-chat message-media ${selfClass}`}>
                        <MessageHeader
                            isCurrentUser={selfClass === "" ? false : true}
                            user={user}
                            time={time}
                        />
                        <video className="chat-video" controls>
                            <source src={fileUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );

            case Message.FILE:
                return (
                    <div
                        className={`message message-chat message-media ${selfClass}`}>
                        <MessageHeader
                            isCurrentUser={selfClass === "" ? false : true}
                            user={user}
                            time={time}
                        />
                        <a className="chat-file" href={fileUrl} target="_blank">
                            <i className="fa fa-file fa-2x mr-2"></i>
                            <span>{fileName}</span>
                        </a>
                    </div>
                );
        }
    };

    /**
     * Render text messages
     */
    const renderChatMessage = () => {
        const { chatMessage } = message;

        // render bot messages
        if (type === Message.BOT) {
            return (
                <div className="message message-bot text-center">
                    <small>{chatMessage}</small>
                </div>
            );
        }

        return (
            <div className={`message message-chat ${selfClass}`}>
                <MessageHeader
                    isCurrentUser={selfClass === "" ? false : true}
                    user={user}
                    time={time}
                />
                <p>{chatMessage}</p>
            </div>
        );
    };

    return (
        <>
            {type === Message.TEXT || type === Message.BOT
                ? renderChatMessage()
                : renderFileMessage()}
        </>
    );
};

export default ChatMessage;
