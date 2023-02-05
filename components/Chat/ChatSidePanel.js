import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./ChatHome";
import "../../styles/chatSidepanel.scss";

const ChatSidebar = ({ roomUsers, isVisible }) => {
    const userInfo = useContext(UserContext);
    const roomInputRef = useRef(null);
    const [tooltipText, setTooltipText] = useState("Copy");
    const [barAnimation, setBarAnimation] = useState("");

    useEffect(() => {
        if (isVisible) setBarAnimation("animate-reveal");
        else setBarAnimation("animate-hide");
    }, [isVisible]);

    /**
     * Copy text to clipboard
     */
    const copyToClipboard = () => {
        setTooltipText("Copied!");
        const roomTxt = roomInputRef.current;
        roomTxt.select();
        roomTxt.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
    };

    return (
        <div
            className={`chat-sidebar secondary-bg col-sm-3 pt-3 pb-3 ${barAnimation} `}>
            <div className="d-flex flex-column">
                <h5 className="mb-3">
                    <i className="fa fa-home pr-2"></i>Room Name
                </h5>
                <div className="d-flex align-items-center primary-bg">
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
                {roomUsers?.length > 0 && (
                    <ul>
                        {roomUsers.map((user) => {
                            return <li key={user.id}>{user.username}</li>;
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
