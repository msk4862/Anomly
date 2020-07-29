import { useRef } from "react";

import ChatMessage from "./ChatMessage";
import ChatMessageSendForm from "./ChatMessageSendForm";
import ChatSidebar from "./ChatSidebar";
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
        <div className="chat container">
            <div className="row justify-content-between align-items-center m-0">
                <div className="col-6 col-sm-4">
                    <img src="/images/chat.png" alt="logo" />
                </div>
                <input
                    className="btn btn-primary ml-auto"
                    type="button"
                    value="Leave Room"
                    onClick={handleLeave}
                />
            </div>

            <div className="row justify-centent-between align-items-start secondary-bg  m-0 p-2">
                {/*Sidebar */}
                <ChatSidebar userInfo={userInfo} roomUsers={roomUsers} />

                {/* MessageArea */}
                <div className="col-sm-10">
                    <div className="row justify-content-between align-items-center">
                        <div className="chat-box white-bg col-12 p-5">
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

                    <ChatMessageSendForm
                        handleMessageSend={handleMessageSend}
                    />
                </div>
                {/* /MessageArea */}
            </div>
        </div>
    );
};

export default ChatPage;
