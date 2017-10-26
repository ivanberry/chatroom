const HTTP = require('http');
const URL = require('url');
let items = [];

const SERVER = HTTP.createServer((req, res) => {
  switch(req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf-8');
      req.on('data', (chunk) => {
        console.log(chunk);
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'DELETE':
      let path = URL.parse(req.url).pathname; //1?key=value
      let i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Params error');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item can not found');
      } else {
        items.splice(i, 1); //from i delete 1 element
        res.end('OK\n');
        break;
      }
    default:
      let body = '';
      body = items.map((item,i) => {
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
  }
});

SERVER.listen(9000, () => console.log('Server run on local 9000'));
