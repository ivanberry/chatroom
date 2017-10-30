const net = require("net");
const events = require("events");

let channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on("join", function(id, client) {
  this.clients[id] = id;
  this.subscriptions[id] = function(senderId, message) {
    if (id !== senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);
});

let server = net.createServer(client => {
  let id = `${client.remoteAddress} : ${client.remotePort}`;
  channel.emit("join", id, client); //automatically listen 'join' event
  client.on("data", data => {
    data = data.toString();
    channel.emit("broadcast", id, data);
  });
});

server.listen(8888, () => {
  console.log("Server running on *:8888");
});
