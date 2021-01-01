import { useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatMessageSendForm from "./ChatMessageSendForm";
import ChatSidebar from "./ChatSidebar";
import "../../styles/chatSection.scss";

const ChatPage = ({ onSend, roomUsers, messages, onLeave }) => {
    const [progress, setProgress] = useState(10);
    const ChatContainerEndRef = useRef(null);

    const handleMessageSend = (message) => {
        // scroll to end of message window
        ChatContainerEndRef.current.scrollIntoView({ behavior: "smooth" });
        onSend(message);
    };

    return (
        <div className="chat-section container">
            <div className="row justify-content-start text-start align-items-center m-0">
                <div className="col">
                    <img src="/images/chat-logo1.png" alt="logo" />
                </div>
                <input
                    className="btn btn-secondary ml-auto"
                    type="button"
                    value="Leave Room"
                    onClick={onLeave}
                />
            </div>

            <div className="row justify-centent-between align-items-start secondary-bg  m-0">
                {/*Sidebar */}
                <ChatSidebar roomUsers={roomUsers} />

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

                            {/* Progress bar for any file sharing */}
                            {progress > 0 && (
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                        <span className="sr-only">
                                            {progress}% Complete
                                        </span>
                                    </div>
                                </div>
                            )}
                            {/* End of progress bar for any file sharing */}

                            <div ref={ChatContainerEndRef} />
                        </div>
                    </div>
                </div>
                {/* /MessageArea */}
            </div>
            <ChatMessageSendForm
                handleMessageSend={handleMessageSend}
                setProgress={setProgress}
            />
        </div>
    );
};

export default ChatPage;
