const http = require("http");

function showForm(req, res) {
  var html =
    "" +
    '<form method="post" action="/" enctype="multipart/form-data">' +
    '<p><input type="text" name="name" /></p>' +
    '<p><input type="file" name="file" /></p>' +
    '<p><input type="submit" value="Upload" /></p>' +
    "</form>";
    res.setHeader('Content-type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      showForm(req, res);
      break;
    case "POST":
      upload(req, res);
      break;
  }
});

server.listen(9002, () => console.log('Server running on port 9002'));
