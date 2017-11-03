const qs = require("querystring");

exports.add = (db, req, res) => {
  parseReceiveData(req, work => {
    let _date = work.date ? work.date : new Date().toISOString();
    let query = `INSERT INTO work (date, description) VALUES ('${_date}', '${work.description}');`;
    db
      .query(query)
      .then(this.show(db, res))
      .catch(err => {
        throw err;
      });
  });
};

exports.archive = (db, req, res) => {
  parseReceiveData(req, work => {
    db
      .query(`UPDATE work SET archived=1 WHERE id=${work.id};`)
      .then(this.show(db, res, true))
      .catch(err => {
        throw err;
      });
  });
};

exports.delete = (db, req, res) => {
  parseReceiveData(req, work => {
    db
      .query(`DELETE FROM work WHERE id=${work.id};`)
      .then(this.show(db, res))
      .catch(err => {
        throw err;
      });
  });
};

exports.show = (db, res, showArchived) => {
  let archived = showArchived ? 1 : 0;
  let query = `SELECT * FROM work
                 WHERE archived=${archived}
                 ORDER BY date DESC;`;
  db
    .query(query)
    .then(rows => {
      let _rows = rows.rows,
        html = showArchived ? '<a href="/">Work To do</a>' : '<a href="/archived">Archived Work</a><br>';
      _rows.map(row => {
        html += buildList(row);
      });
      sendHtml(res, html);
    })
    .catch(err => {
      throw err;
    });
};

function buildList(row) {
  return `<li>${row.date} -- ${row.description}</li>`;
}

exports.showArchive = (db, res) => {
    this.show(db, res, true);
};

function sendHtml(res, html) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function parseReceiveData(req, cb) {
  let body = "";
  req.setEncoding("utf-8");
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", () => {
    let data = qs.parse(body);
    cb(data);
  });
}

exports.actionForm = (id, path, label) => {
  let html = `<form method="POST" action="${path}" >
            <input type="hidden" name="id" value="${id}" />
            <input type="submit" value="${value} />
            </form>"`;
  return html;
};
