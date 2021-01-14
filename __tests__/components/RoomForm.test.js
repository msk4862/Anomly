import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ChatForm from "../../components/Chat/RoomForm";
import RoomForm from "../../components/Chat/RoomForm";

afterEach(cleanup);
describe("Room form tests", () => {
    test("Testing room form with valid inputs", () => {
        const onJoin = jest.fn();
        const testUser = {
            username: "Test123",
            room: "test",
        };

        const { container, getByText } = render(
            <RoomForm handleSubmit={onJoin} />
        );

        const usernameInput = container.querySelectorAll("input")[0];
        const roomnameInput = container.querySelectorAll("input")[1];
        const submitInput = getByText("Join Chat");

        // setting value
        fireEvent.change(usernameInput, {
            target: { value: testUser.username },
        });
        fireEvent.change(roomnameInput, { target: { value: testUser.room } });

        fireEvent.click(submitInput);

        // Assertions
        expect(onJoin).toHaveBeenCalledTimes(1);
        expect(onJoin).toHaveBeenCalledWith(testUser);
    });

    test("Testing chat form with invalid inputs", () => {
        const onJoin = jest.fn();
        var username = "";
        var roomname = "";

        const { container, getByText } = render(
            <ChatForm handleSubmit={onJoin} />
        );

        const usernameInput = container.querySelectorAll("input")[0];
        const roomnameInput = container.querySelectorAll("input")[1];
        const submitInput = getByText("Join Chat");

        // setting value
        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(roomnameInput, { target: { value: roomname } });

        fireEvent.click(submitInput);

        var usernameErrorMessage = getByText(/Username can't be empty!/i); //substring match, ignore case
        var roomErrorMessage = getByText(/Room name can't be empty!/i);
        var errorDivs = container.getElementsByClassName("error");

        // Assertions
        expect(onJoin).toHaveBeenCalledTimes(0);
        expect(usernameErrorMessage).toBeInTheDocument();
        expect(roomErrorMessage).toBeInTheDocument();
        expect(errorDivs).toHaveLength(2);

        // testing other errors
        username = "less";
        roomname = "with space";

        // setting value
        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(roomnameInput, { target: { value: roomname } });

        fireEvent.click(submitInput);

        usernameErrorMessage = getByText(/Username is too short/i);
        roomErrorMessage = getByText(/Room name can't have spaces/i);
        errorDivs = container.getElementsByClassName("error");

        // Assertions
        expect(onJoin).toHaveBeenCalledTimes(0);
        expect(usernameErrorMessage).toBeInTheDocument();
        expect(roomErrorMessage).toBeInTheDocument();
        expect(errorDivs).toHaveLength(2);
    });
});
