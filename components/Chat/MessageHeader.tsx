import { Message } from "@/utils/Message";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

type Props = {
  isCurrentUser: boolean;
  time: dayjs.Dayjs;
  user: Message["user"];
};

const MessageHeader = ({ isCurrentUser, time, user }: Props) => {
  dayjs.extend(customParseFormat);

  return (
    <p>
      {isCurrentUser ? <small>You</small> : <small>{user}</small>}
      <small>{dayjs(time).format("h:mm:ss a")}</small>
    </p>
  );
};

export default MessageHeader;
