import { useState, useRef, useEffect, useContext } from "react";
import "../../styles/chatmessagesendform.scss";
import { UserContext } from "./ChatHome";
import { Message, TextMessage, FileMessage } from "../../utils/Message";
import FloatingButtonList from "./FloatingButtonList";

const ChatMessageSendForm = ({ handleMessageSend, setProgress }) => {
    // current user
    const userInfo = useContext(UserContext);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isFloatBtnVisible, setFloatBtnVisible] = useState(false);
    const chatInputRef = useRef(null);

    useEffect(() => {
        chatInputRef.current.focus();
    });

    useEffect(() => {
        if (message.trim() !== "") setError("");
    }, [message]);

    // handles text messages
    const onSendText = (event) => {
        event.preventDefault();
        const messageText = message.trim();
        const username = userInfo ? userInfo.username : "";

        if (messageText !== "") {
            handleMessageSend(
                new TextMessage(username, messageText, Message.TEXT)
            );
            setMessage("");
            chatInputRef.current.focus();
        } else {
            setError("error");
        }
    };

    // handles file messages
    const onSendFile = (url, fileName, type) => {
        const username = userInfo ? userInfo.username : "";

        handleMessageSend(new FileMessage(username, url, fileName, type));
    };

    const toggleFloatBtnVisibility = () => {
        setFloatBtnVisible((prevState) => !prevState);
    };

    return (
        <div className="chatsend-form align-self-stretch">
            <form
                className="d-flex justify-content-center align-items-center"
                onSubmit={onSendText}>
                <div className="attachment-menu">
                    <FloatingButtonList
                        onSend={onSendFile}
                        isVisible={isFloatBtnVisible}
                        toggleVisibility={toggleFloatBtnVisibility}
                        setProgress={setProgress}
                    />
                    <span
                        className="circular-btn"
                        onClick={toggleFloatBtnVisibility}>
                        <i className="fa fa-paperclip"></i>
                    </span>
                </div>

                <div className="flex-grow-1">
                    <input
                        className={`form-control ${error}`}
                        ref={chatInputRef}
                        type="text"
                        placeholder="Type your message here..."
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button className="btn btn-secondary ml-1" type="submit">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default ChatMessageSendForm;
