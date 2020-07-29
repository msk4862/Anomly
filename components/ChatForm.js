import { useState } from "react";

import "../styles/chatform.scss";

const ChatForm = ({ handleSubmit }) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const onJoin = (event) => {
        event.preventDefault();

        const user = {
            username,
            room,
        };
        handleSubmit(user);
    };

    return (
        <div className="chat-form-container container">
            <div className="row justify-content-center m-0 text-center">
                <h2 className="p-5">Welcome again to Anomly!</h2>
            </div>
            <div className="row justify-content-center align-items center m-0">
                <div className="chat-form col-10 col-sm-6 col-md-4 p-0">
                    <div className="row justify-content-center align-items-center m-0">
                        <img src="/images/chat.png" alt="icon" />
                    </div>
                    <form onSubmit={onJoin}>
                        <div className="form-group">
                            <label>Display name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Room name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="room"
                                value={room}
                                onChange={(event) =>
                                    setRoom(event.target.value)
                                }
                            />
                        </div>

                        <input
                            className="btn"
                            type="submit"
                            value="Join Chat"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
