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

function joinRoom(options) {
  let {socket, room } = options;
  socket.join(room);
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', () => {
    text: nickNames[socket.id] + ' has joined ' + room
  });
  let usersInRoom = io.sockets.clients(room);
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = 'Users currently in ' + room + ': ';
    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
      usersInRoomSummary += '.';
      socket.emit('message', {text: usersInRoomSummary});
    }
  }
}

function handleClientDisconnection() {}

function handleMessageBroadcasting() {}

function handleNameChangeAttempts() {}

function handleRoomJoining() {}

exports.listen = function (server) {
  io = socketio(server);
  io.serveClient("log level", 1);

  io.on("connection", socket => {
      socket.on('message', (msg) => {
          console.log(msg);
          console.log(`new message: ${msg}`);
      })
    //guestNumber = assignGuestName({socket, guestNumber, nickNames, nameUsed});
    //joinRoom(socket, "Lobby"); //test user

    //handleMessageBroadcasting(socket, nickNames, nameUsed);
    //handleNameChangeAttempts(socket, nickNames, nameUsed);
    //handleRoomJoining(socket);

    socket.on("rooms", () => {
      socket.emit("rooms", io.socketio.manager.rooms);
    });

    //handleClientDisconnection(socket, nickNames, nameUsed);
  });
}
