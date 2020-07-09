
let users = [];

const UserJoin = (socket_id, username, room_no) => {
    const user = {
        socket_id,
        username,
        room_no
    }
    users.push(user);
    return user;
}

const getRoomUsers = (room_no) => {
    return users.filter(x => x.room_no === room_no);
}

const getCurrentUser = (socket_id) => {
    return users.find(x => x.socket_id === socket_id);
}
module.exports = {
    UserJoin,
    getRoomUsers,
    getCurrentUser
}