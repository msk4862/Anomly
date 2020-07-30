import { useRef } from "react";

import ChatMessage from "./ChatMessage";
import ChatMessageSendForm from "./ChatMessageSendForm";
import ChatSidebar from "./ChatSidebar";
import { APP_NAME } from "../utils/Constants";
import "../styles/chatpage.scss";

const ChatPage = ({ onSend, userInfo, roomUsers, messages, onLeave }) => {
    const ChatContainerEndRef = useRef(null);

    const handleMessageSend = (message) => {
        ChatContainerEndRef.current.scrollIntoView({ behavior: "smooth" });
        onSend(message);
    };

    const handleLeave = () => {
        onLeave();
    };

    return (
        <div className="chat-page container">
            <div className="row justify-content-start text-start align-items-center m-0">
                <div className="col">
                    <img src="/images/chat.png" alt="logo" />
                    <h3>{APP_NAME}</h3>
                </div>
                <input
                    className="btn btn-secondary ml-auto"
                    type="button"
                    value="Leave Room"
                    onClick={handleLeave}
                />
            </div>

            <div className="row justify-centent-between align-items-start secondary-bg  m-0">
                {/*Sidebar */}
                <ChatSidebar userInfo={userInfo} roomUsers={roomUsers} />

                {/* MessageArea */}
                <div className="col-sm-9">
                    <div className="row justify-content-between align-items-center">
                        <div className="chat-box white-bg col-12">
                            {/* Message */}
                            {messages.map((msg, index) => {
                                return (
                                    <ChatMessage key={index} message={msg} />
                                );
                            })}
                            {/* /Message */}

                            <div ref={ChatContainerEndRef} />
                        </div>
                    </div>
                </div>
                {/* /MessageArea */}
            </div>
            <div className="row">
                <div className="col">
                    <ChatMessageSendForm
                        handleMessageSend={handleMessageSend}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
