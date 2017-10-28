export default class Chat {
  constructor(socket) {
    this.socket = socket;
  }

  sendMessage(room, text) {
    let message = {
      room: room,
      text: text
    };
    this.socket.emit("message", message);
  }

  changeRoom(room) {
    this.socket.emit("join", {
      newRoom: room
    });
  }
}
