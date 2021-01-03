const dayjs = require("dayjs");

class Message {
    constructor(username, type) {
        this.user = username;
        this.time = dayjs(new Date());
        this.type = type;
    }
}

class TextMessage extends Message {
    constructor(username, chatMessage, type) {
        super(username, type);
        this.chatMessage = chatMessage;
    }
}

class FileMessage extends Message {
    constructor(username, fileUrl, fileName, type) {
        super(username, type);
        this.fileUrl = fileUrl;
        this.fileName = fileName;
    }
}

// message types
Message.TEXT = "text";
Message.BOT = "bot";
Message.IMAGE = "image";
Message.VIDEO = "video";
Message.FILE = "file";
Message.OTHERS = "others";

module.exports = {
    Message,
    TextMessage,
    FileMessage,
};
