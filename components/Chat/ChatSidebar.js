import { useContext, useRef, useState } from "react";
import { UserContext } from "./ChatHome";
import "../../styles/chatsidebar.scss";

const ChatSidebar = ({ roomUsers }) => {
    const userInfo = useContext(UserContext);
    const roomInputRef = useRef(null);
    const [tooltipText, setTooltipText] = useState("Copy");

    const copyToClipboard = () => {
        setTooltipText("Copied!");
        const roomTxt = roomInputRef.current;

        roomTxt.select();
        roomTxt.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
    };

    return (
        <div className="chat-sidebar col-sm-3 p-3">
            <div className="row">
                <div className="col">
                    <h5>
                        <i className="fa fa-home pr-2"></i>Room Name
                    </h5>
                    <div class="d-flex align-items-center primary-bg mt-3">
                        <div className="room-name flex-grow-1 p-2">
                            <input
                                ref={roomInputRef}
                                value={userInfo.room}
                                readOnly
                            />
                        </div>
                        <div
                            className="custom-tooltip custom-tooltip-top"
                            data-tooltip={tooltipText}>
                            <button
                                className="btn m-0 p-2"
                                onClick={copyToClipboard}>
                                <i className="fa fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <small>Invite others by sharing above room name!</small>
                    <h5 className="mt-3 mb-3">
                        <i className="fa fa-users pr-2"></i>Users
                    </h5>
                    <ul>
                        {roomUsers.map((user) => {
                            return <li key={user.id}>{user.username}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
