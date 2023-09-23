import dayjs, { Dayjs } from "dayjs";

export class Message {
  user: string;
  time: Dayjs;
  type: TMessageTypes;
  constructor(username: string, type: TMessageTypes) {
    this.user = username;
    this.time = dayjs(new Date());
    this.type = type;
  }
}

export class TextMessage extends Message {
  chatMessage: string;
  constructor(username: string, chatMessage: string, type: TextMessageTypes) {
    super(username, type);
    this.chatMessage = chatMessage;
  }
}

export class FileMessage extends Message {
  fileUrl: string;
  fileName: string;
  constructor(
    username: string,
    fileUrl: string,
    fileName: string,
    type: FileMessageTypes
  ) {
    super(username, type);
    this.fileUrl = fileUrl;
    this.fileName = fileName;
  }
}
