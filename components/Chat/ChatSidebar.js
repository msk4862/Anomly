import { useContext } from "react";
import { UserContext } from "./ChatHome";
import "../../styles/chatsidebar.scss";

const ChatSidebar = ({ roomUsers }) => {
    const userInfo = useContext(UserContext);

    return (
        <div className="chat-sidebar col-sm-3 p-3">
            <div className="row">
                <div className="col">
                    <h5>
                        <i className="fa fa-home pr-2"></i>Room Name
                    </h5>
                    <h5 className="primary-bg p-2 mt-3">{userInfo.room}</h5>
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
