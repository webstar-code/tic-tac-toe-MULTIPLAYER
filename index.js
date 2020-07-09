const express = require('express');
const http = require('http');
const app = express();


const server = http.createServer(app);
const io = require('socket.io')(server);

const { UserJoin, getRoomUsers, getCurrentUser } = require('./utils/users');
app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('room_no', ({ username, room_no }) => {
        const user = UserJoin(socket.id, username, room_no)
        console.log(user);
        socket.join(user.room_no);
        

        io.to(user.room_no).emit('roomUsers', { room: user.room_no, users: getRoomUsers(user.room_no) });

    })

    socket.on('input', ({input, index}) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room_no).emit('playerinput', {username: user.username, input, index});
    })
})


server.listen(3000, () => {
    console.log("Listeining on 3000");
})

