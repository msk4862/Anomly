const online_users: TUser[] = [];

export function addUser(
  id: TUser["id"],
  username: TUser["username"],
  room: TUser["room"]
) {
  const user = { id, username, room };
  online_users.push(user);
}

export function getCurrentUser(id: TUser["id"]) {
  return online_users.find((user) => user.id === id);
}

export function removeUser(id: TUser["id"]) {
  const index = online_users.findIndex((user) => user.id === id);

  if (index !== -1) {
    online_users.splice(index, 1);
  }
}

export function getRoomUsers(room: TUser["room"]) {
  return online_users.filter((user) => user.room === room);
}
