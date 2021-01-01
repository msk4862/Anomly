const dayjs = require("dayjs");

class Message {
    constructor(username, chatMessage, type) {
        this.user = username;
        this.chatMessage = chatMessage;
        this.time = dayjs(new Date());
        this.type = type;
    }
}
// message types
Message.TEXT = "text";
Message.BOT = "bot";
Message.IMAGE = "image";
Message.VIDEO = "video";
Message.FILE = "file";
Message.OTHERS = "others";

module.exports = Message;
