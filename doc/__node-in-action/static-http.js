const http = require('http');
const parse = require('url').parse;
const fs  = require('fs');
const join = require('path').join;

const ROOT = __dirname;

let server = http.createServer((req, res) => {
  let url = parse(req.url);
  let path = join(ROOT, url.pathname);
  fs.stat(path, (err, stat) => {
    if (err) {
      if ('ENOENT' === err.code) {
        res.statusCode = 404;
        res.end('Cant find the resource');
      } else {
        res.statusCode = 500;
        res.end('Interal error');
      }
    } else {
      res.setHeader('Content-Type', stat.size);
      let stream = fs.createReadStream(path);
      stream.pipe(res);
      res.on('error', (err) => {
        res.statusCode = 500;
        res.end('Interal Server error');
      });
    }
  });
});

server.listen(9001);
