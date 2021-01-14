import { Message, TextMessage, FileMessage } from "../../utils/Message";

describe("Testing Message utility", () => {
    test("Testing Message class", () => {
        const username = "username";
        const type = Message.IMAGE;

        const message = new Message(username, type);
        expect(message.user).toBe(username);
        expect(message.type).toBe(type);
        expect(message.time).toBeDefined();
    });
    test("Testing TextMessage class", () => {
        const username = "username";
        const type = Message.IMAGE;
        const chatMessage = "message";

        const textMessage = new TextMessage(username, chatMessage, type);
        expect(textMessage.user).toBe(username);
        expect(textMessage.type).toBe(type);
        expect(textMessage.time).toBeDefined();
        expect(textMessage.chatMessage).toBe(chatMessage);
    });
    test("Testing FileMessage class", () => {
        const username = "username";
        const type = Message.IMAGE;
        const fileUrl = "https://dummyurl.com";
        const fileName = "file_name";

        const fileMessage = new FileMessage(username, fileUrl, fileName, type);
        expect(fileMessage.user).toBe(username);
        expect(fileMessage.type).toBe(type);
        expect(fileMessage.time).toBeDefined();
        expect(fileMessage.fileUrl).toBe(fileUrl);
        expect(fileMessage.fileName).toBe(fileName);
    });
});
