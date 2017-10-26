let socketio = require("socket.io");

let io;
let guestNumber = 1;
let nickNames = {};
let nameUsed = [];
let currRoom = {};

function assignGuestName(options) {
    let {socket, guestNumber, nickNames, nameUsed} = options;
    let name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    nameUsed.push(name);
    return guestNumber + 1;
}

function joinRoom() {}

function handleClientDisconnection() {}

function handleMessageBroadcasting() {}

function handleNameChangeAttempts() {}

function handleRoomJoining() {}

export function listen(server) {
  io = socketio.listen(server);
  io.serveClient("log level", 1);

  io.sockets.on("connection", socket => {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed);
    joinRoom(socket, "Lobby"); //test user

    handleMessageBroadcasting(socket, nickNames, nameUsed);
    handleNameChangeAttempts(socket, nickNames, nameUsed);
    handleRoomJoining(socket);

    socket.on("rooms", () => {
      socket.emit("rooms", io.socketio.manager.rooms);
    });

    handleClientDisconnection(socket, nickNames, nameUsed);
  });
}
