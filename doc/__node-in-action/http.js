const HTTP = require('http');
const URL = require('url');
let items = [];

const SERVER = HTTP.createServer((req, res) => {
  switch(req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf-8');
      req.on('data', (chunk) => {
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'DELETE':
      let path_delete = URL.parse(req.url).pathname; //1?key=value
      let i = parseInt(path_delete.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Params error');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item can not found');
      } else {
        items.splice(i, 1); //from i delete 1 element
        res.end('OK\n');
      }
      break;
    case 'PUT':
      let path_put = URL.parse(req.url).pathname;
      let n = parseInt(path_put.slice(1), 10);
      if (isNaN(n)) {
        res.statusCode = 400;
        res.end('Params error');
      }else if (!items[n]) {
        res.statusCode = 404;
        res.end('Item can not found');
      } else {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          items[n] = body;
          res.end('OK\n');
        });
      }
      break;
    case 'GET':
      let body = '';
      body = items.map((item,i) => {
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    default:
      throw new Error('Unknown error happened');
      break;
  }
});

SERVER.listen(9000, () => console.log('Server run on local 9000'));
