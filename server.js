let http = require("http");
let fs = require("fs");
let path = require("path");
let mime = require("mime");

let chatServer = require('./lib/chat_server.js');

var cache = {};
let cacheOn = false;

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("Error 404: resource not found");
  res.end();
}

function sendFile(res, filePath, fileContents) {
  res.writeHead(200, { "content-type": mime.getType(path.basename(filePath)) });
  res.end(fileContents);
}

function serveStatic(res, cache, absPath) {
  if (cacheOn && cache[absPath]) {
    sendFile(res, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, exists => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(res);
          } else {
              cache[absPath] = data;
              sendFile(res, absPath, data);
          }
        });
      } else {
          send404(res);
      }
    });
  }
}

const SERVER = http.createServer((request, response) => {
    let filePath = false;

    if (request.url === '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url
    }

    let absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

SERVER.listen(8080, () => {
    console.log('Server listening on port 8080');
});

chatServer.listen(SERVER); // socket.io server with same TCP/IP connection as HTTP services
