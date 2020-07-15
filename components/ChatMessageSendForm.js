import { useState } from "react";

import "../styles/chatmessagesendform.scss";

const ChatMessageSendForm = ({ handleMessageSend }) => {
    const [message, setMessage] = useState("");

    const onSend = (event) => {
        event.preventDefault();

        handleMessageSend(message);
        setMessage("");
    };

    return (
        <div className="row justify-content-center align-items-center m-0 mt-2">
            <div className="col-12">
                <form className="form row" onSubmit={onSend}>
                    <div className="col-12 col-sm-10 pr-0">
                        <input
                            className=""
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
