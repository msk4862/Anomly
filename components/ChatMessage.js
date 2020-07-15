// import "../styles/chatmessage.scss";

const ChatMessage = ({ message }) => {
    return (
        <div className="message">
            <p>
                <small>Shaoib</small>
                <small>9:15 A.M.</small>
            </p>
            <p>{message}</p>
        </div>
    );
};

export default ChatMessage;
