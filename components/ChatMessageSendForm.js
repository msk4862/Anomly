import { useState, useRef, useEffect } from "react";

import "../styles/chatmessagesendform.scss";

const ChatMessageSendForm = ({ handleMessageSend }) => {
    const [message, setMessage] = useState("");
    const chatInputRef = useRef(null);

    useEffect(() => {
        chatInputRef.current.focus();
    });

    const onSend = (event) => {
        event.preventDefault();

        handleMessageSend(message);
        setMessage("");
        chatInputRef.current.focus();
    };

    return (
        <div className="row justify-content-center align-items-center m-0 mt-2">
            <div className="col-12">
                <form className="form row" onSubmit={onSend}>
                    <div className="col-12 col-sm-10 pr-0">
                        <input
                            ref={chatInputRef}
                            type="text"
                            placeholder="Enter Message"
                            autoComplete="off"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatMessageSendForm;
