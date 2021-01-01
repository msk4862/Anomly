import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const MessageHeader = ({ isCurrentUser, time, user }) => {
    dayjs.extend(customParseFormat);

    return (
        <p>
            {isCurrentUser ? <small>You</small> : <small>{user}</small>}
            <small>{dayjs(time).format("h:mm:ss a")}</small>
        </p>
    );
};

export default MessageHeader;
