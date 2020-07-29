const online_users = [];

function addUser(id, username, room) {
    const user = { id, username, room };
    online_users.push(user);
}

function getCurrentUser(id) {
    return online_users.find((user) => user.id === id);
}

function removeUser(id) {
    const index = online_users.findIndex((user) => user.id === id);

    if (index != -1) {
        online_users.splice(index, 1);
    }
}

function getRoomUsers(room) {
    return online_users.filter((user) => user.room === room);
}

module.exports = {
    addUser,
    getCurrentUser,
    removeUser,
    getRoomUsers,
};
