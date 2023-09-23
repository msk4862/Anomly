import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatMessageSendForm from "./ChatMessageSendForm";
import ChatSidePanel from "./ChatSidePanel";
import ProgressBar from "../ProgressBar";
import "./ChatSection.scss";
import { Message } from "@/utils/Message";

type Props = {
  onSend: (message: Message) => void;
  roomUsers: TUser[];
  messages: Message[];
  onLeave: () => void;
};

const ChatSection = ({ onSend, roomUsers, messages, onLeave }: Props) => {
  const [isSidePanelVisible, setSidePanelVisibility] = useState(true);
  const [arrowDirection, setArrowDirection] = useState("up");
  const [progress, setProgress] = useState(0);
  const chatContainerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 575 ? setSidePanelVisibility(true) : "";
    });

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    if (isSidePanelVisible) setArrowDirection("up");
    else setArrowDirection("down");
  }, [isSidePanelVisible]);

  const handleMessageSend = (message: Message) => {
    // scroll to end of message window
    chatContainerEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

      <div className="row justify-centent-between align-items-start secondary-bg flex-fill m-0">
        {/*SidePanel */}
        <ChatSidePanel isVisible={isSidePanelVisible} roomUsers={roomUsers} />
        <button
          aria-label="hide side panel"
          className="btn sidebar-toggle"
          onClick={() => setSidePanelVisibility((prev) => !prev)}>
          <i className={`fas fa-chevron-${arrowDirection}`}></i>
        </button>

        {/* MessageArea */}
        <div className="chat-box col-sm-9 white-bg" style={{ height: "100%" }}>
          {/* Message */}
          {messages.map((msg, index) => {
            return <ChatMessage key={index} message={msg} />;
          })}
          {/* /Message */}

          {/* Progress bar for any file sharing */}
          {progress > 0 && (
            <ProgressBar progress={progress} color={"#3282b8"} />
          )}
          <div ref={chatContainerEndRef} />
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

export default ChatSection;
