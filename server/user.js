const online_users = [];

function addUser(id, username, room) {
    const user = { id, username, room };
    online_users.push({ user });
}

function getCurrentUser(id) {
    return online_users.find((user) => user.id === id);
}

module.exports = {
    addUser,
    getCurrentUser,
};
