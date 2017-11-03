const path = require("path"),
  fs = require("fs"),
  ROOT = __dirname;

exports.showIndex = (file, res) => {
  fs
    .readFile(path.join(ROOT, file), (err, data) => {
        if (err) throw err;
        let tmp = data.toString();
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', Buffer.byteLength(tmp));
        res.end(tmp);
    })
};
