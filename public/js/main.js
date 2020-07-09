let socket = io();
const invite = document.querySelector('.invite');

let url_string = window.location.href;
let url = new URL(url_string);
let room_no = url.searchParams.get('room_no');
let username = url.searchParams.get('username');

const inviteP = document.createElement('p');
inviteP.innerHTML = `<p>Share this room no ${room_no } with your friend to connect</p>`;
document.querySelector('.invite').appendChild(inviteP);

// send user info
socket.emit('room_no', ({ username, room_no }));

// getting room users and assigign player-1 & player-2
let input = ' ';


let player_1 = '';
let player_2 = '';
socket.on('roomUsers', ({ room_no, users }) => {
    console.log(users);
    document.querySelector('.player-1').innerHTML = users[0].username;
    player_1 = users[0].username;

    if (users[1]) {
        player_2 = users[1].username;
        document.querySelector('.player-2').innerHTML = users[1].username;
    } else {
        document.querySelector('.player-2').innerHTML = "Waiting...";

    }
    console.log(users[0].username);
    console.log(username);
    if (users[0].username === username) {
        input = "X";
    } else {
        input = "O";
    }

})

const block = document.querySelectorAll('.block');
block.forEach((item, index) => {

    item.addEventListener('click', event => {
        socket.emit('input', ({ username, input, index }));

    })

})

let active = true;
socket.on('playerinput', msg => {
    let item = block.item(msg.index);
    if (msg.input === "X") {
        item.innerHTML = msg.input;
        item.setAttribute("style", "color: red");
        item.set
    } else {
        item.innerHTML = msg.input;
        item.setAttribute("style", "color: blue");
    }
    item.setAttribute("disabled", "true");
    // make the current user active state false
    if (msg.username === username) {
        active = false;
    } else {
        active = true;
    }
    activeUser(active);


    let result = get_winner(block);
    if (result.innerHTML === "X") {
        const WinnerDiv = document.querySelector('.WinnerDiv');    
        WinnerDiv.innerHTML = `<p>${player_1} Won<p><a href="index.html"><u>Exit<u></a>`;
    
    } else {
        const WinnerDiv = document.querySelector('.WinnerDiv');
        WinnerDiv.innerHTML = `<p>${player_2} Won<p><a href="index.html"><u>Exit<u></a>`;
    }




})

const activeUser = (active) => {
    console.log(active);
    // If active false that means i should not be the active player
    if (!active) {
        block.forEach(item => {
            item.setAttribute("disabled", "true");

        })
    } else {
        block.forEach(item => {
            item.removeAttribute("disabled");

        })
    }

}

const get_winner = (block) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        console.log(block[a].innerHTML, block[b].innerHTML, block[c].innerHTML);
    }
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (block[a].innerHTML && block[a].innerHTML === block[b].innerHTML && block[a].innerHTML === block[c].innerHTML) {
            return block[a];
        }
    }
}

