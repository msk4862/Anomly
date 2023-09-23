import {
  useState,
  useRef,
  useEffect,
  useContext,
  SetStateAction,
  Dispatch,
  FormEvent,
} from "react";
import { UserContext } from "@/context/UserContext";
import { Message, TextMessage, FileMessage } from "@/utils/Message";
import FloatingButtonList from "./FloatingButtonList";
import "./ChatMessageSendform.scss";

type Props = {
  handleMessageSend: (message: Message) => void;
  setProgress: Dispatch<SetStateAction<number>>;
};

const ChatMessageSendForm = ({ handleMessageSend, setProgress }: Props) => {
  // current user
  const { user: userInfo } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isFloatBtnVisible, setFloatBtnVisible] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatInputRef.current?.focus();
  });

  useEffect(() => {
    if (message.trim() !== "") setError("");
  }, [message]);

  // handles text messages
  const onSendText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageText = message.trim();
    const username = userInfo ? userInfo.username : "";

    if (messageText !== "") {
      handleMessageSend(new TextMessage(username, messageText, "text"));
      setMessage("");
      chatInputRef.current?.focus();
    } else {
      setError("error");
    }
  };

  // handles file messages
  const onSendFile = (
    url: string,
    fileName: string,
    type: FileMessageTypes
  ) => {
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
          <span className="circular-btn" onClick={toggleFloatBtnVisibility}>
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
        <button
          aria-label="send message"
          className="btn btn-secondary ml-1"
          type="submit">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessageSendForm;
