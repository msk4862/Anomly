import "../styles/chatsidebar.scss";

const ChatSidebar = ({ userInfo, roomUsers }) => {
    const { room } = userInfo;

    return (
        <div className="chat-sidebar col-sm-3 p-3">
            <div className="row">
                <div className="col">
                    <h5>Room Name</h5>
                    <p className="primary-bg p-2 mt-3">{room}</p>
                    <h5 className="mt-3 mb-3">Users</h5>
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
