import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ChatMessageSendForm from "../../components/Chat/ChatMessageSendForm";
import FloatingButtonList from "../../components/Chat/FloatingButtonList";

afterEach(cleanup);
describe("Testing Message Sending Form", () => {
    test("Testing sending text message with valid input", () => {
        const handleMessageSend = jest.fn();
        const setProgress = jest.fn();
        const textMessage = "hello there!";

        const { container } = render(
            <ChatMessageSendForm
                handleMessageSend={handleMessageSend}
                setProgress={setProgress}
            />
        );

        const textMessageInput = container.querySelector(".form-control");
        const sendButton = container.querySelector("button");

        fireEvent.change(textMessageInput, {
            target: { value: textMessage },
        });
        fireEvent.submit(sendButton);

        expect(textMessageInput).toHaveFocus();
        expect(textMessageInput).toHaveClass("form-control");
        expect(handleMessageSend).toHaveBeenCalled();
        expect(handleMessageSend).toHaveBeenCalledTimes(1);
    });

    test("Testing sending text message with invalid input", () => {
        const handleMessageSend = jest.fn();
        const setProgress = jest.fn();
        const textMessage = "";

        const { container } = render(
            <ChatMessageSendForm
                handleMessageSend={handleMessageSend}
                setProgress={setProgress}
            />
        );

        const textMessageInput = container.querySelector(".form-control");
        const sendButton = container.querySelector("button");

        fireEvent.change(textMessageInput, {
            target: { value: textMessage },
        });
        fireEvent.submit(sendButton);

        expect(handleMessageSend).toHaveBeenCalledTimes(0);
        expect(textMessageInput).toHaveClass("error");
    });
    test("Testing FloatButtonList", () => {
        const onSendFile = jest.fn();
        const setProgress = jest.fn();
        const toggleVisibility = jest.fn();

        const isFloatButtonListVisible = true;

        const { container } = render(
            <FloatingButtonList
                onSend={onSendFile}
                isVisible={isFloatButtonListVisible}
                toggleVisibility={toggleVisibility}
                setProgress={setProgress}
            />
        );

        const floatMenu = container.querySelector(".float-menu");
        const floatButtons = container.getElementsByTagName("input");

        const imageSelectionInput = floatButtons[0];

        fireEvent.click(imageSelectionInput);

        expect(floatMenu).toBeInTheDocument(floatMenu);
        expect(floatMenu).toHaveClass("animate-reveal");
        expect(floatButtons).toHaveLength(3);
        expect(toggleVisibility).toBeCalled();
        expect(toggleVisibility).toBeCalledTimes(1);
    });
});
