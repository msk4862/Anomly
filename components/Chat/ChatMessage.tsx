import { useContext } from "react";
import MessageHeader from "./MessageHeader";
import { UserContext } from "@/context/UserContext";
import { TextMessage, FileMessage, Message } from "@/utils/Message";
import "./ChatMessage.scss";

type ChatMessageProps = {
  message: Message;
};

function isTextMessage(message: any): message is TextMessage {
  return typeof message === typeof TextMessage;
}

function isFileMessage(message: any): message is FileMessage {
  return typeof message === typeof FileMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  // current user
  const { user: userInfo } = useContext(UserContext);

  const { user, type, time } = message;
  const selfClass = userInfo?.username === user ? "message-chat-self" : "";

  /**
   * Render text messages
   */
  if (isTextMessage(message)) {
    const { chatMessage } = message;

    // render bot messages
    if (type === "bot") {
      return (
        <div className="message message-bot text-center">
          <small>{chatMessage}</small>
        </div>
      );
    }

    return (
      <div className={`message message-chat ${selfClass}`}>
        <MessageHeader
          isCurrentUser={Boolean(selfClass)}
          user={user}
          time={time}
        />
        <p>{chatMessage}</p>
      </div>
    );
  }

  /**
   * Render file messages using their URL
   */
  if (isFileMessage(message)) {
    const { fileUrl, fileName } = message;

    switch (type) {
      case "image":
        return (
          <div className={`message message-chat message-media ${selfClass}`}>
            <MessageHeader
              isCurrentUser={Boolean(selfClass)}
              user={user}
              time={time}
            />
            <img className="chat-image" src={fileUrl} alt={user + " " + time} />
          </div>
        );

      case "video":
        return (
          <div className={`message message-chat message-media ${selfClass}`}>
            <MessageHeader
              isCurrentUser={Boolean(selfClass)}
              user={user}
              time={time}
            />
            <video className="chat-video" controls>
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "file":
        return (
          <div className={`message message-chat message-media ${selfClass}`}>
            <MessageHeader
              isCurrentUser={Boolean(selfClass)}
              user={user}
              time={time}
            />
            <a className="chat-file" href={fileUrl} target="_blank">
              <i className="fa fa-file fa-2x mr-2"></i>
              <span>{fileName}</span>
            </a>
          </div>
        );
    }
  }

  return null;
};

export default ChatMessage;
