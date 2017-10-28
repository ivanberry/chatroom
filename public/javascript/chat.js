let Chat = function (socket) {
    this.socket = socket;
}

Chat.prototype.sendMessage = (room, text) => {
    let message = {
        room: room,
        text: text,
    };
    this.socket.emit('message', message);
};

Chat.prototype.changeRoom = (room) => {
    this.socket.emit('join', {
        newRoom: room
    });
};