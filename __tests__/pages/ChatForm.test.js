import React from "react";
import {
    render,
    cleanup,
    fireEvent,
    getAllByText,
} from "@testing-library/react";
import ChatForm from "../../components/Chat/ChatForm";

afterEach(cleanup);

test("Testing chat form with valid inputs", () => {
    const onJoin = jest.fn();
    const testUser = {
        username: "Test123",
        room: "test",
    };

    const { container, getByText } = render(<ChatForm handleSubmit={onJoin} />);

    const usernameInput = container.querySelectorAll("input")[0];
    const roomnameInput = container.querySelectorAll("input")[1];
    const submitInput = getByText("Join Chat");

    // setting value
    fireEvent.change(usernameInput, { target: { value: testUser.username } });
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

    const { container, getByText } = render(<ChatForm handleSubmit={onJoin} />);

    const usernameInput = container.querySelectorAll("input")[0];
    const roomnameInput = container.querySelectorAll("input")[1];
    const submitInput = getByText("Join Chat");

    // setting value
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(roomnameInput, { target: { value: roomname } });

    fireEvent.click(submitInput);

    const usernameErrorMessage = getByText(/Username can't be empty!/i); //substring match, ignore case
    const roomErrorMessage = getByText(/Room name can't be empty!/i);
    const errorDivs = container.getElementsByClassName("error");

    // Assertions
    expect(onJoin).toHaveBeenCalledTimes(0);
    expect(usernameErrorMessage).toBeInTheDocument();
    expect(roomErrorMessage).toBeInTheDocument();
    expect(errorDivs).toHaveLength(2);
});
