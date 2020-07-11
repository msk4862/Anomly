import { useEffect, useState } from "react";
import io from "socket.io-client";

import "../styles/chatpage.scss";

const ChatPage = ({ onSend }) => {

    const [message, setMessage] = useState('');

    function handleMessageSend(event) {
        event.preventDefault();

        onSend(message);
        setMessage('');
    }

    return (
        <div className="chat">
            <div className="row justify-content-between align-items-center m-0">
                <div className="col-6 col-sm-4">
                    <img src="/images/chat.png" alt="logo" />
                </div>
                <input
                    className="btn btn-primary ml-auto"
                    type="button"
                    value="Leave Room"
                />
            </div>

            <div className="row secondary-bg m-0 p-2">
                {/* Sidebar */}
                <div className="col-12">
                    <div className="row justify-content-between align-items-center">
                        <div className="chat-box white-bg col-12">
                            <div className="container p-5">

                                <div className="row justify-content-start align-items-center secondary-bg p-3">
                                    <div className="col-12 col-sm-8">
                                        <p className="m-0">HGgjas hgu</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="chat-form-container row justify-content-center align-items-center m-0 mt-2">
                        <div className="col-12">
                            <form className="form row" onSubmit={handleMessageSend}>
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
                                    <button
                                        className="btn btn-primary"
                                        type="submit">
                                        Send
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
