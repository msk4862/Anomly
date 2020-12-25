import { useState, useRef, useEffect } from "react";

import "../../styles/chatmessagesendform.scss";
import FloatingButtonList from "./FloatingButtonList";

const ChatMessageSendForm = ({ handleMessageSend }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [isFloatBtnVisible, setFloatBtnVisible] = useState(false);
    const chatInputRef = useRef(null);

    useEffect(() => {
        chatInputRef.current.focus();
    });

    const onSend = (event) => {
        event.preventDefault();
        const messageText = message.trim();

        if (messageText != "") {
            handleMessageSend(messageText);
            setMessage("");
            chatInputRef.current.focus();
        } else {
            validate(messageText);
        }
    };

    const toggleFloatBtnVisibility = () => {
        setFloatBtnVisible((prevState) => !prevState);
    };

    /**
     * Validating form fields
     * @param  {String} value
     */
    const validate = (value) => {
        let messageError = null;
        if (value === "") {
            messageError = "Type your message!";
        }
        setError(messageError);
    };
    /**
     * adds error class
     * @param  {String} error
     */
    const addErrorClass = (error) => {
        if (error) return "error";
        return "";
    };

    return (
        <div className="chatsend-form">
            <form
                className="d-flex justify-content-center align-items-center"
                onSubmit={onSend}>
                <div className="btn-collection">
                    <FloatingButtonList isVisible={isFloatBtnVisible} />
                    <span
                        className="circular-btn"
                        onClick={toggleFloatBtnVisibility}>
                        <i className="fa fa-paperclip"></i>
                    </span>
                </div>

                <div className={`flex-grow-1 ${addErrorClass(error)}`}>
                    <input
                        className="form-control"
                        ref={chatInputRef}
                        type="text"
                        placeholder="Type your message here..."
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button className="btn btn-secondary ml-1" type="submit">
                    <i className="fa fa-send"></i>
                </button>
            </form>
        </div>
    );
};

export default ChatMessageSendForm;
