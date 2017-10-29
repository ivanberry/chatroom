let socketio = require("socket.io");

let io;
let guestNumber = 1;
let nickNames = {};
let nameUsed = [];
let currRoom = {};

/**
 * 给客官来个名字
 * @param {*} options 
 */
function assignGuestName(options) {
  let { socket, guestNumber, nickNames, nameUsed } = options;

  let name = "Guest" + guestNumber;
  nickNames[socket.id] = name;
  socket.emit("nameResult", {
    success: true,
    name: name
  });
  nameUsed.push(name);
  return guestNumber + 1;
}

/**
 * 告诉大伙来了个新人, 并展示所有的老人
 * @param {*} options 
 */
function joinRoom(options) {
  let { socket, room } = options;
  socket.join(room); // if the room is empty?
  currRoom[socket.id] = room;
  socket.emit("joinResult", { room: room });

  socket.broadcast.to(room).emit("message", {
    text: nickNames[socket.id] + " has joined " + room
  });
  
  let usersInRoom = io.sockets.adapter.rooms[room];
  if (usersInRoom.length > 1) {
    let usersInRoomSummary = "Users currently in " + room + ": ",
      sockets = usersInRoom.sockets,
      _length = usersInRoom.length;
    for (let _socketid in sockets) {
      if (_socketid != socket.id) {
        if (_length > 1) {
          usersInRoomSummary += ", ";
        }
        usersInRoomSummary += nickNames[_socketid];
      }
    }
    usersInRoomSummary += ".";
    socket.emit("message", { text: usersInRoomSummary });
  }
}

/**
 * 离开
 * @param {*} socket 
 */
function handleClientDisconnection(socket) {
  socket.on('disconnect', () => {
    let nameIndex = nameUsed.indexOf(nickNames[socket.id]);
    delete nameUsed[nameIndex];
    delete nickNames[socket.id];
  })
}

/**
 * 消息广播
 * @param {*} socket 
 */
function handleMessageBroadcasting(socket) {
  socket.on('message', (message) => {
    socket.broadcast.to(message.room).emit('message', {
      text: `${nickNames[socket.id]}: ${message.text}`
    })
  })
}

/**
 * 有人想换名字
 * @param {*} options 
 */
function handleNameChangeAttempts(options) {
  let { socket, nickNames, nameUsed } = options;
  socket.on("nameAttempt", name => {
    if (name.indexOf("Guest") === 0) {
      socket.emit("nameResult", {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    } else {
      if (!nameUsed.includes(name)) {
        let previousName = nickNames[socket.id];
        nickNames[socket.id] = name;
        nameUsed.push(name);
        delete previousName;

        socket.emit("nameResult", {
          success: true,
          name: name
        });

        socket.broadcast.to(currRoom[socket.id]).emit("message", {
          text: `${previousName} is now know as ${name}`
        });
      } else {
        socket.emit("meesage", {
          success: false,
          message: "That name is already in use!"
        });
      }
    }
  });
}

/**
 * 接客落
 * @param {*} socket 
 */
function handleRoomJoining(socket) {
  socket.on('join', (result) => {
    let room = result.newRoom;
    socket.leave(currRoom[socket.id]);
    joinRoom({socket, room});
  })
}

exports.listen = function(server) {
  io = socketio(server);
  io.serveClient("log level", 1);

  io.on("connection", socket => {
    socket.on("message", msg => {
      console.log(`new message: ${msg}`);
    });

    guestNumber = assignGuestName({ socket, guestNumber, nickNames, nameUsed });
    joinRoom({ socket, room: "Lobby" }); //test user

    handleMessageBroadcasting(socket);
    handleNameChangeAttempts({socket, nickNames, nameUsed});
    handleRoomJoining(socket);

    socket.on("rooms", () => {
      socket.emit("rooms", socket.rooms);
    });

    handleClientDisconnection(socket);
  });
};
