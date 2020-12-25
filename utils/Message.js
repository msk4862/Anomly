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
Message.IMAGE = "image";
Message.BOT = "bot";

module.exports = Message;
