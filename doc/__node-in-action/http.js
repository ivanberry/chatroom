const HTTP = require('http');
const SERVER = HTTP.createServer((req, res) => {
  var url = 'http://www.fengchelicai.com';
  var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>';
  res.setHeader('Location', url);
  res.setHeader('Content-Type', 'plain/text');
  res.setHeader('Content-Length', body.length);
  res.statusCode = 302;
  res.end(body);
});

SERVER.listen(9000, () => console.log('Server run on local 9000'));
