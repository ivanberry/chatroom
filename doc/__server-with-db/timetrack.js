const qs = require("querystring");

exports.add = (db, req, res) => {
  debugger;
  this.parseReceiveData(req, work => {
    db
      .query(
        `INSERT INTO work (hours, date, description)
            VALUES (${work.hours}, ${work.date}, ${work.description})
            `
      )
      .then(this.show(db, res))
      .catch(err => {
        throw err;
      });
  });
};

exports.archive = (db, req, res) => {
  console.log("archive");
};

exports.delete = (db, req, res) => {
  console.log("delete");
};

exports.show = (db, res, showArchived) => {
  let query = `SELECT * FROM work
                 WHERE archived=${showArchived ? 0 : 1}
                 ORDER BY date DESC`;
  db
    .query(query)
    .then(rows => {
      html = showArchived ? "" : `<a href="/archived">Archived Work</a><br>`;
      rows.map(row => {
        html += buildList(row);
      });
    })
    .catch(err => {
      throw err;
    });
};

function buildList(row) {
  return `<li>${row.date}: ${row.hours} ${row.description}`;
}

exports.showArchive = (db, res) => {
  console.log("show archive");
};

exports.sendHtml = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
};

exports.parseReceiveData = (req, cb) => {
  let body = "";
  req.setEncoding("utf-8");
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", () => {
    let data = qs.parse(body);
    cb(data);
  });
};

exports.actionForm = (id, path, label) => {
  let html = `<form method="POST" action="${path}" >
            <input type="hidden" name="id" value="${id}" />
            <input type="submit" value="${value} />
            </form>"`;
  return html;
};
