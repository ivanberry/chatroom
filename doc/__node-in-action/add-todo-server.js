const http = require('http');
let items = [];

const server = http.createServer((req, res) => {
  switch(req.method) {
    case('GET'):
      show(res);
      break;
    case('POST'):
      add(req, res);
      break;
    default:
      badRequest(res);
  }
});

server.listen(3003);
