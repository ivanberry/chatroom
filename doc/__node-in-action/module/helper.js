const qs = require("querystring");

function add(req, res) {
  let body = "";
  let _items = [];
  res.setEncoding("utf-8");
  res.on("data", chunk => {
    body += chunk;
  });
  res.on("end", () => {
    let obj = qs.parse(body);
    _items.push(obj.item);
    return _items;
  });
}

function show(res) {
  let html =
    "<html><head><title>Todo List</title></head><body>" + "<h1>Todo List</h1>"; // For simple apps, inlining + '<ul>' the HTML instead of + items.map(function(item){ using a template engine return '<li>' + item + '</li>' works well. }).join('') + '</ul>' + '<form method="post" action="/">' + '<p><input type="text" name="item" /></p>' + '<p><input type="submit" value="Add Item" /></p>' + '</form></body></html>';
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function badRequest(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Interanl Server Error");
}

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
