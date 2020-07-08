import { useEffect } from "react";
import io from "socket.io-client";

import "../styles/chatpage.scss";
import Link from "next/link";

const ChatPage = () => {
    // useEffect(() => {
    //     const socket = io();
    //     socket.on("message", (data) => {
    //         console.log(data);
    //     });
    // }, []);

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
                        <div className="chat-box white-bg col-12">Message</div>
                    </div>

                    <div className="chat-form-container row justify-content-center align-items-center m-0 mt-2">
                        <div className="col-12 col-sm-10 pr-0">
                            <input
                                type="text"
                                placeholder="Enter Message"
                                autoComplete="off"
                            />
                        </div>
                        <button
                            className="align-self-stretch btn btn-primary"
                            type="submit">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
